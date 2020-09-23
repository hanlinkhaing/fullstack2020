const express = require('express')
require('express-async-errors')
const mongoose = require("mongoose");
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()

mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    logger.info('Connected to MongoDB Atlas')
}).catch(err => logger.error('Can\'t connet error',err.message))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(middleware.errorHandler)

module.exports = app

