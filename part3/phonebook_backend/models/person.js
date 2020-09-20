const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

console.log('connect to', url)

mongoose.set('useFindAndModify', false)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true}).then(result => {
    console.log("Connected to mongodb")
}).catch(err => {
    console.log("Can't connect to mongodb", err.message)
})

const personSchema = mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)