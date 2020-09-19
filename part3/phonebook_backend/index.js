const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())

morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})

app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

let persons = [
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "lin",
    number: "1234",
    id: 4,
  },
  {
    name: "han",
    number: "12345",
    id: 5,
  },
];

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const firstLine = `<p>Phonebook has info for ${persons.length} people</p>`
    const secondLine = `<p>${new Date().toString()}</p>`;
    res.send(firstLine.concat(secondLine))
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person=> person.id === id)
    person ? 
        res.json(person) :
        res.status(404).send('<p>Content Not Found!</p>')
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person=> person.id !== id)
    persons.po
    res.status(204).end();
})

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

app.post('/api/persons', (req, res) => {
    const id = getRandomInt(100)
    const person = {...req.body, id}
    if (!person.name || !person.number) 
        return res.status(400).send({error: 'name or number is missing'}).end()
    if (persons.find(p => person.name === p.name))
        return res.status(400).send({error: 'name must be unique'}).end()
    persons = persons.concat(person)
    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
