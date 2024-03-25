const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const errorHandler = require('./middleware/errorHandler')
const {getInfo, getHomePage, getAllPersons, findPerson, addPerson, updatePerson, deletePerson} = require("./controllers/personController");

// Middlewares
dotenv.config() // Middleware to load environment variables from a .env file into process.env

let app = express() // Create an express app

app.use(morgan('tiny')) // Middleware to log the request details
app.use(express.json()) // Middleware to parse JSON data in the body of the request
app.use(cors()) // Middleware to allow requests from other origins

// Backend Deployment to Render is Successful Exercise 3.10
// Backend Deployment to Render is Successful Exercise 3.21
// Auto-Deploy in ON for the backend repository on Render.com

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)
app.use(errorHandler)

// Routes Middlewares
app.get('/api/info', getInfo); // Route to get info about the phonebook Exercise 3.18
app.get('/', getHomePage);
app.get('/api/persons', getAllPersons);
app.get('/api/persons/:id', findPerson); // Route to get a single person by ID Exercise 3.18
app.post('/api/persons', addPerson);
app.put('/api/persons/:id', updatePerson);
app.delete('/api/persons/:id', deletePerson);

const url = process.env.MONGODB_URI

// console.log('connecting to', url) // Uncomment this line to see the value of the url variable

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`)
})