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
  } catch (error) {
    console.error(error);
    response.status(500).send('An error occurred while fetching persons');
  }
})

// Function to generate a random id
// const generateRandomId = () => {
//   let id;
//   do {
//     id = Math.floor(Math.random() * 1000000);
//   } while (Person.find(person => person.id === id)); // Check if the id is already in use
//   // If the id is already in use, generate a new one
//   return id;
// }

// Route to add a new person
const addPerson = app.post('/api/persons', async (request, response) => {
  try {
    const body = request.body

    if (!body.name || !body.number) {
      return response.status(400).json({
        error: 'Name or number is missing'
      })
    }

    const existingPerson = await Person.findOne({ name: body.name });

    if (existingPerson) {
      return response.status(400).json({
        error: 'User with this Name is already in database'
      })
    }

    const person = new Person({
      name: body.name,
      number: body.number
    });

    const savedPerson = await person.save();
    response.json(savedPerson.toJSON());

  } catch (error) {

    console.error(error);
    response.status(500).send('An error occurred while adding a person');
  }
});

// Export the controllers
  module.exports = {
    getHomePage,
    getAllPersons,
    addPerson
  };