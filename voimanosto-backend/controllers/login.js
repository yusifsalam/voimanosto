const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const Users = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const body = req.body
  const user = await Users.findOne({ username: body.username })
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.usernmame,
    id: user._id
  }
  const token = jwt.sign(userForToken, process.env.SECRET)

  res
    .status(200)
    .send({
      token,
      username: user.username,
      name: user.name,
      email: user.email,
      avatar: user.avatar
    })
})

module.exports = loginRouter