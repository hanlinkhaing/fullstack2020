const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator")

const url = process.env.MONGODB_URL

console.log('connect to', url)

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true}).then(result => {
    console.log("Connected to mongodb")
}).catch(err => {
    console.log("Can't connect to mongodb", err.message)
})

const personSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        require: true,
        minlength: 3,
    },
    number: {
        type: String,
        require: true,
        minlength: 8,
        validate: {
            validator: (value) => {
                return /^\d+$/.test(value);
            },
            message: 'Invalid phone number'
        }
    }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)