const express = require('express');
const { getAllPersons, findPerson, addPerson, updatePerson, deletePerson } = require("../controllers/personController");

const app = express();

// Route to get all persons
app.get('/api/persons' , getAllPersons);

// Route to get a single person By ID Exercise 3.18
app.get('/api/persons/:id', findPerson);

// Route to add a new person
app.post('/api/persons', addPerson);

// Route to update a person
app.put('/api/persons/:id', updatePerson);

// Route to delete a person
app.delete('/api/persons/:id', deletePerson);

module.exports = app;
