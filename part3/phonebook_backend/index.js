require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const Person = require("./models/person")
app.use(express.static('build'))
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
    Person.find({}).then(result => {
        res.json(result)
    })
})

app.get('/info', (req, res) => {
    const firstLine = `<p>Phonebook has info for ${persons.length} people</p>`
    const secondLine = `<p>${new Date().toString()}</p>`;
    res.send(firstLine.concat(secondLine))
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(result => {
        res.json(result)
    })
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id).then(() => {
        res.status(204).end();
    })
})

app.post('/api/persons', (req, res) => {
    if (!req.body.name || !req.body.number) 
        return res.status(400).send({error: 'name or number is missing'}).end()
    const person = new Person({
        name: req.body.name,
        number: req.body.number
    })
    person.save().then(p => {
        res.json(p)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
