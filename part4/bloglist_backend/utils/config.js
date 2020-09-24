require('dotenv').config()

let MONGODB_URL = process.env.MONGODB_URL
const PORT = process.env.PORT
const SECRET = process.env.SECRET

if (process.env.NODE_ENV === 'test') MONGODB_URL = process.env.TEST_MONGODB_URL

module.exports = { MONGODB_URL, PORT, SECRET }