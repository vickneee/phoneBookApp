const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const {getHomePage, getAllPersons, findPerson, addPerson} = require("./controllers/personController");

// Middlewares
dotenv.config() // Middleware to load environment variables from a .env file into process.env

let app = express() // Create an express app

app.use(morgan('tiny')) // Middleware to log the request details
app.use(express.json()) // Middleware to parse JSON data in the body of the request
app.use(cors()) // Middleware to allow requests from other origins
// app.use(express.static('build')) // Middleware to serve static files

// Backend Deployment to Render is Successful Exercise 3.10

// // Data
// let persons =  [
//   {
//     "id": 1,
//     "name": "Arto Hellas",
//     "number": "040-123456"
//   },
//   {
//     "id": 2,
//     "name": "Ada Lovelace",
//     "number": "39-23-6423122",
//   },
//   {
//     "id": 3,
//     "name": "Dan Abramov",
//     "number": "12-43-234345"
//   },
//   {
//     "id": 4,
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122",
//   }
// ]


const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

// Routes Middlewares
app.get('/', getHomePage);
app.get('/api/persons', getAllPersons);
app.get('/api/persons/:id', findPerson);
app.post('/api/persons', addPerson);


// Route to get a single person
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if(person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// Route to update a person
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

// Route to get the info
app.get('/api/info', (request, response) => {
  const info = `
    <h1>Phonebook</h1>
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `;
  response.send(info);
});

const url = process.env.MONGODB_URI

// console.log('connecting to', url) // Uncomment this line to see the value of the url variable

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`)
})