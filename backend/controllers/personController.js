const express = require('express')
const Person = require('../models/personModel')
const errorHandler = require('../middleware/errorHandler')

// Create an express app  and use the errorHandler middleware
const app = express()
// Use the errorHandler middleware
app.use(errorHandler)

// Controller to get info
const getInfo = app.get('/api/info', async (request, response, next) => {
  try {
    const count = await Person.countDocuments({});
    const info = `
      <h1>Phonebook</h1>
      <p>Phonebook has info for ${count} people</p>
      <p>${new Date()}</p>
    `;
    response.send(info);
  } catch (error) {
    // Pass the error to the error handler middleware
    next(error);
  }
});

// Controller to get home page
const getHomePage = app.get('/', async (request, response, next) => {
  try {
    await response.send('<h1>PhoneBook App!</h1>');
  } catch (error) {
    // Pass the error to the error handler middleware
    next(error);
  }
})

// Controller to get all persons
const getAllPersons = app.get('/api/persons', async (request, response, next) => {
  try {
    const persons = await Person.find({}).then(persons => {
      return persons.map(person => person.toJSON());
    });
    // console.log(persons); // Log the persons to the console For debugging purposes
    response.json(persons);
  } catch (error) {
    // Pass the error to the error handler middleware
    next(error);
  }
})

// Controller to get a single person
const findPerson = app.get('/api/persons/:id', async (request, response, next) => {
  const id = request.params.id;
  try {
    const person = await Person.findById(id);
    if(person) {
      response.json(person);
    } else {
      response.status(404).send('"User not found"').end();
    }
  } catch (error) {
    // Pass the error to the error handler middleware
    next(error);
  }
});

// Controller to add a new person
const addPerson = app.post('/api/persons', async (request, response, next) => {
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
    // Pass the error to the error handler middleware
    next(error);
  }
});

// Controller to delete a person
const deletePerson = app.delete('/api/persons/:id', async (request, response, next) => {
  const id = request.params.id;
  try {
    const result = await Person.findByIdAndDelete(id);
    if (result) {
      response.status(200).json({ message: 'User deleted' });
    } else {
      response.status(404).send('User not found or already deleted');
    }
  } catch (error) {
    // Pass the error to the error handler middleware
    next(error);
  }
});

// Export the controllers
  module.exports = {
    getInfo,
    getHomePage,
    getAllPersons,
    findPerson,
    addPerson,
    deletePerson
  };