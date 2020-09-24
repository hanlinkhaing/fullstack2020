const loginRouter = require('express').Router()
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async (req, res) => {
    const body = req.body

    const user = await User.findOne({ username: body.username})
    const pCorrect = user === null ? false: await bcrypt.compare(body.password, user.password)

    if (!(user && pCorrect))
        return res.status(401).send({error: 'invalid username or password'})

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = JWT.sign(userForToken, config.SECRET)

    res.status(200).send({
        token,
        username: user.username,
        name: user.name
    })
})

module.exports = loginRouter