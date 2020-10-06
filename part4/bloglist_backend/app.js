const express = require('express')
require('express-async-errors')
const mongoose = require("mongoose");
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    logger.info('Connected to MongoDB Atlas')
}).catch(err => logger.error('Can\'t connet error',err.message))

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
    const testRouter = require('./controllers/testing')
    app.use('/api/testing', testRouter)
}

app.use(middleware.errorHandler)

module.exports = app

