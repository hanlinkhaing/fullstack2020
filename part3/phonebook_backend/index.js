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

app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(result => {
        res.json(result)
    }).catch(err => next(err))
})

app.get('/info', (req, res) => {
    const firstLine = `<p>Phonebook has info for ${persons.length} people</p>`
    const secondLine = `<p>${new Date().toString()}</p>`;
    res.send(firstLine.concat(secondLine))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(result => {
        result ?
            res.json(result):
            res.status(404).end()
    }).catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id).then(() => {
        res.status(204).end();
    }).catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    const person = { ...req.body}
    Person.findByIdAndUpdate(id, person, { new: true}).then(updated => {
        res.json(updated)
    }).catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
    if (!req.body.name || !req.body.number) 
        return res.status(400).send({error: 'name or number is missing'}).end()
    const person = new Person({
        name: req.body.name,
        number: req.body.number
    })
    person.save().then(p => {
        res.json(p)
    }).catch(err => next(err))
})

const errorHandler = (err, req, res, next) => {
    console.log(err.message)

    if (err.name === 'CastError') 
        return res.status(400).send({ error: 'malformatted id'})

    next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
