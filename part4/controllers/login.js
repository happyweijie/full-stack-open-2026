const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user !== null
    ? await bcrypt.compare(password, user.passwordHash)
    : false

  if (!user || !passwordCorrect) {
    return response.status(401)
      .status({ error: 'invalid username or password' })
  }

  const userForToken = { 
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(
    userForToken, 
    process.env.SECRET, 
    { expiresIn: 60 * 60 }
  )

  response.status(200)
    .send({ 
      token,
      username: user.username,
      name: user.name
    })
})

module.exports = loginRouter
