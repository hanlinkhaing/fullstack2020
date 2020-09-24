const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { body, validationResult } =require('express-validator')

userRouter.post('/', [
    body('username').exists().isLength({min: 3}),
    body('password').exists().isLength({min: 3})
], async (req, res) => {
    const reqBody = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) 
        return res.status(400).json({error: 'invalid username or password'})
    const saltRounds = 11
    const password = await bcrypt.hash(reqBody.password, saltRounds)
    let user = new User({
        username: reqBody.username,
        name: reqBody.name,
        password: password
    })
    user = await user.save()
    res.json(user)
})

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { user: 0 })
    res.json(users)
})

module.exports = userRouter
