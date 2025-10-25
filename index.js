const express = require('express')
const app = express()
var morgan = require('morgan')

// Module 3.9 - Phonebook backend step 9
const cors = require('cors')
app.use(cors())

app.use(express.json())

// Module 3.8 - Phonebook backend step 8
// create a custom token that returns the request body for POST and PUT
// (keeps GET requests from logging body content)
morgan.token('body', (req) => {
    if (req.method === 'POST' || req.method === 'PUT') {
        return JSON.stringify(req.body)
    }
    return ''
})

// Module 3.8 - Phonebook backend step 8
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


// Module 3.7 - Phonebook backend step 7
// app.use(morgan('tiny'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// Module 3.5 - Phonebook backend step 5
const generateId = () => {
    return String(Math.floor(Math.random() * 10000))
}

// Module 3.5 - Phonebook backend step 5
app.post('/api/persons', (request, response) => {
    const body = request.body

    // Module 3.6 - Phonebook backend step 6
    if(!body.name) {
        return response.status(400).json({
            error: 'name is missing'
        })
    }

    // Module 3.6 - Phonebook backend step 6
    if(!body.number) {
        return response.status(400).json({
            error: 'number is missing'
        })
    }

    // Module 3.6 - Phonebook backend step 6
    const nameExists = persons.find(person => person.name === body.name)
    if(nameExists) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    response.json(person)
})

// Module 3.4 - Phonebook backend step 4
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

// Module 3.3 - Phonebook backend step 3
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// Module 3.2 - Phonebook backend step 2
app.get('/info', (request, response) => {
  response.send(
    'Phonebook has info for ' + persons.length + ' people'
    + '<br>' + new Date()
  )
})

// Module 3.1 - Phonebook backend step 1
app.get('/', (request, response) => {
  response.send('<h1>Welcome to my Phonebook!</h1>')
})

// Module 3.1 - Phonebook backend step 1
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})