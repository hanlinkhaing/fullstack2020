const JWT = require('jsonwebtoken')
const User = require('../models/user')
const config = require('./config')

const tokenValidator = async (token) => {
    // const authorization = req.get('authorization')
    // let tokenString = null
    // if (authorization && authorization.toLowerCase().startsWith('bearer '))
    //     tokenString = authorization.substring(7)

    const decodedToken = JWT.verify(token, config.SECRET)
    if (!token || !decodedToken.id)
        return {isValid: false, user: null}

    const user = await User.findById(decodedToken.id).populate('blogs', {_id: 1})

    return {isValid: true, user}
}

module.exports = tokenValidator