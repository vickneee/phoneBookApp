const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

// Middlewares
app.use(morgan('tiny')) // Middleware to log the request details

app.use(express.json()) // Middleware to parse JSON data in the body of the request

app.use(cors()) // Middleware to allow requests from other origins

// Data
let persons =  [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-23-6423122",
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
  }
]

// Routes
// Route to get the home page
app.get('/', (request, response) => {
  response.send('<h1>PhoneBook App!</h1>')
})

// Route to get all persons
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

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

// Function to generate a random id
const generateRandomId = () => {
  let id;
  do {
    id = Math.floor(Math.random() * 1000000);
  } while (persons.find(person => person.id === id)); // Check if the id is already in use
  // If the id is already in use, generate a new one
  return id;
}

// Route to add a new person
app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name || !body.number) {
    return response.status(400).json({
      error: 'Name or number is missing'
    })
  }

  if(persons.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'User with this Name is already in database'
    })
  }

  const person = {
    id: generateRandomId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  response.json(person)
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})