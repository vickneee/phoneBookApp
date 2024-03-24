const express = require('express')
const Person = require('../models/personModel')

const app = express()

// Controller to get home page
const getHomePage = app.get('/', (request, response) => {
  response.send('<h1>PhoneBook App!</h1>')
})

// Controller to get all persons
const getAllPersons = app.get('/api/persons', async (request, response) => {
  try {
    const persons = await Person.find({}).then(persons => {
      return persons.map(person => person.toJSON());
    });
    // console.log(persons); // Log the persons to the console For debugging purposes
    response.json(persons);
  }
  catch(error) {
    console.error(error);
    response.status(500).send('An error occurred while fetching persons');
  }
})

module.exports = {
  getAllPersons,
  getHomePage
};