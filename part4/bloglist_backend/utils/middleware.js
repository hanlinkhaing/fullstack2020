const { response } = require("../app");

const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError')
        return response.status(400).send({error: error.message})
    else if (error.name === 'JsonWebTokenError')
        return response.status(401).send({error: 'invalid token'})

    next(error)
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    let tokenString = null
    if (authorization && authorization.toLowerCase().startsWith('bearer '))
        tokenString = authorization.substring(7)
    req.token = tokenString
    next()
}

module.exports = { errorHandler, tokenExtractor }