const Joi       = require('joi');       // returns a class - used for param validation
const express   = require('express');   // returns a func
const app = express();

app.use(express.json());

const pages = [
    { id: 1, name: "page1" },
    { id: 2, name: "page2" },
    { id: 3, name: "page3" }
];

app.get('/', (req, resp) => {
    resp.send('Hello world!');   // this will print "Hello World!" when 
});                              // navigating to http://localhost/

app.get('/pages', (req, resp) => {
    resp.send( pages );
});


app.get('/page/:id', (req, resp) => {
    
    // find the requested page
    const page = pages.find(c => c.id === parseInt(req.params.id));
    if (!page) {
        resp.status(404).send('The page with the given ID was not found.');
        return;
    }

    // page exists, return it
    resp.send(page);
    
});


/*--------------------------------------------------
    POST requests to the endpoint /pages
    allows users to *create* a page
--------------------------------------------------*/

app.post('/pages', (req, resp) => {

    const { error } = validate_page(req.body);
    if (error) {
        resp.status(400).send(error.details[0].message); // 400 Bad Request
        return;
    }
    
    // create the page as requested by user
    const page = {
        id: (pages.length + 1),
        name: req.body.name      
    };

    // save the object to our 'database'
    pages.push(page);
    
    // return the created object
    resp.send(page);
});


/*--------------------------------------------------
    PUT requests to the endpoint /pages/(num)
    allows users to *update* a page object
--------------------------------------------------*/

app.put('/page/:id', (req, resp) => {

    // Lookup page
    const page = pages.find(c => c.id === parseInt(req.params.id));

    // If doesn't exist, return 404
    if (!page) {
        resp.status(404).send('The page with the given ID was not found.');
        return;
    }
    
    // page exists, validate POST reqest params
    const { error } = validate_page(req.body);
    if (error) {
        resp.status(400).send(error.details[0].message); // 400 Bad Request
        return;
    }

    // Request is valid, update page
    page.name = req.body.name;

    // Return the updated page
    resp.send(page);

});

app.delete('/page/:id', (req, resp) => {
    // Lookup page
    const page = pages.find(c => c.id === parseInt(req.params.id));
    
    // If doesn't exist, return 404
    if (!page) {
        resp.status(404).send('The page with the given ID was not found.');
        return;
    }

    // page exists, delete it from 'database' - our array is our database for now
    let i = pages.indexOf(page);
    pages.splice(i, 1);

    resp.send(page);

});

/*--------------------------------------------------
    Validate page parameters for PUT and POST
--------------------------------------------------*/
function validate_page(page) {
    
    const scheme = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(page, scheme);
}





// process is a gloval variable. 
// Use the eviroment variable if it's set, otherwise use port 3000.
const port = process.env.PORT || 3000;

app.listen( port, () => console.log(`Listening on port ${port}`) );


