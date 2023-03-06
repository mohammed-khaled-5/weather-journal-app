// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Require Body-Parser and CORS 
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

// Middleware
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port =  5000;

const server = app.listen(port, ()=>{
    console.log("server running");
    console.log(`running on localhost ${port}`);
});

// GET Route
app.get('/all', function (req, res) {
    console.log(req);
    res.send(projectData);
});


// POST Route
app.post('/addNewEntry', entryData);

function entryData (request, response) {  
    projectData = {
        date: request.body.date, // project specific 
        temp: request.body.temp, // project specific 
        content: request.body.content // project specific
    }
    response.send(projectData);
}
