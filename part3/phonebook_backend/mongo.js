const mongoose = require("mongoose")

if (process.argv.length < 3) {
    console.log("Please provide the password field as argument!")
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://root:${password}@cluster0.4qkux.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv[3] && process.argv[4]) {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name,
        number
    })
    
    person.save().then(result => {
        console.log(`Added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(p => {
            console.log(`${p.name} ${p.number}`)
        })
        mongoose.connection.close()
    })
}