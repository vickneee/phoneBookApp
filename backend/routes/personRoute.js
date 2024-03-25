const express = require('express');
const { getInfo, getHomePage, getAllPersons, findPerson, addPerson, deletePerson } = require("../controllers/personController");

const app = express();

// Route to get the info page
app.get('/api/info', getInfo);

// Route to get the home page
app.get('/', getHomePage);

// Route to get all persons
app.get('/api/persons' , getAllPersons);

// Route to get a single person
app.get('/api/persons/:id', findPerson);

// Route to add a new person
app.post('/api/persons', addPerson);

// Route to delete a person
app.delete('/api/persons/:id', deletePerson);

module.exports = app;
