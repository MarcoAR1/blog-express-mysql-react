const loginRouter = require('express').Router()
const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SING } = require('../utils/config')

loginRouter.post('/', async (req, res) => {
  const { username = '', password = '' } = req.body
  const getUser = await new User({ username }).getUserLogin()
  const CurrentUser = getUser.find((user) => user.username === username)

  if (!CurrentUser)
    return res.status(401).json({ message: 'Pasword or username incorrect.' })
  if (!(username === CurrentUser.username))
    return res.status(401).json({ message: 'Pasword or username incorrect.' })
  if (!(await bcrypt.compare(password, CurrentUser.password)))
    return res.status(401).json({ message: 'Pasword or username incorrect.' })
  const tokenUser = {
    username: CurrentUser.username,
    name: CurrentUser.name,
    email: CurrentUser.email,
    user_id: CurrentUser.user_id,
    role: CurrentUser.role,
  }
  const token = jwt.sign(tokenUser, SING, { expiresIn: 60 * 60 * 24 * 15 })

  return res.status(202).send({
    username: CurrentUser.username,
    name: CurrentUser.name,
    email: CurrentUser.email,
    role: CurrentUser.role,
    token,
  })
})

module.exports = loginRouter
