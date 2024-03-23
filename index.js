const express = require('express')
const app = express()

app.use(express.json()) // Middleware to parse JSON data in the body of the request

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

app.get('/', (request, response) => {
  response.send('<h1>PhoneBook App!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}/`)
})