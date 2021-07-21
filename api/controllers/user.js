const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User.js')
const verifyRole = require('../utils/middleware/verifyRole.js')
const verifyToken = require('../utils/middleware/verifyToken.js')
const { USER_ROLE } = require('../utils/USER_ROLE.js')

userRouter.put('/role/:role/:id', verifyToken, verifyRole, async (req, res) => {
  const { user_id } = req
  const roleRef = req.role
  const { id, role } = req.params
  const userRef = await User().getUser(user_id)
  if (!userRef.role === roleRef) {
    return res
      .status(401)
      .json({ message: "You are not allowed to change this user's role" })
  }

  if (
    roleRef === USER_ROLE.ADMIN &&
    (role === USER_ROLE.ADMIN ||
      role === USER_ROLE.MODERATOR ||
      role === USER_ROLE.USER)
  ) {
    const updateUser = await new User().updateUserRole({ role: role }, id)
    if (updateUser.affectedRows) {
      return res.status(200).json({ message: 'User updated successfully' })
    }
    res.status(400).json({ message: 'User dont possible to update' })
  }
  if (
    roleRef === USER_ROLE.MODERATOR &&
    (role === USER_ROLE.MODERATOR || role === USER_ROLE.USER)
  ) {
    const updateUser = await new User().updateUserRole({ role: role }, id)
    if (updateUser.affectedRows) {
      return res.status(200).json({ message: 'User updated successfully' })
    }
    res.status(400).json({ message: 'User dont possible to update' })
  }
})

userRouter.post('/', async (req, res) => {
  let { username = '', password = '', name = '', email = '' } = req.body

  password = await bcrypt.hash(password, 10)
  const newUser = await new User({
    username,
    password,
    name,
    email,
    role: USER_ROLE.USER,
  }).Create()

  if (newUser.message) {
    return res.status(400).json(newUser.message)
  }

  res.status(201).json(newUser)
})

userRouter.put('/', verifyToken, async (req, res) => {
  const data = {}
  const username = req.username
  const user_id = req.user_id
  for (let x in req.body) {
    if (x === 'password') {
      data[x] = await bcrypt.hash(req.body[x], 10)
      continue
    }
    data[x] = req.body[x]
  }
  const updateUser = await new User({ username }).updateUser(data, user_id)
  if (updateUser.affectedRows) {
    return res.status(200).json({ message: 'User updated successfully' })
  }
  res.status(400).json({ message: 'User dont possible to update' })
})

userRouter.delete('/', verifyToken, async (req, res) => {
  const { username, email, password } = req.body
  const user_id = req.user_id
  if (username !== req.username) {
    return res.status(401).json({ error: 'No authorization' })
  }
  const getUser = await new User({ username }).getUserLogin()
  const CurrentUser = getUser.find((user) => user.username === username)
  if (!CurrentUser) return res.status(404).json({ message: 'user not found' })
  if (CurrentUser.email !== email)
    return res.status(401).json({ error: 'No authorization' })
  if (!(await bcrypt.compare(password, CurrentUser.password)))
    return res.status(401).json({ message: 'invalid credential' })

  const deleteUser = await new User().deleteUser(username, email, user_id)
  res.status(200).json(deleteUser)
})

module.exports = userRouter