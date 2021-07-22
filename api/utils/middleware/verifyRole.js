const { USER_ROLE } = require('../USER_ROLE')

const verifyRole = (req, res, next) => {
  const { role } = req

  if (!(role === USER_ROLE.ADMIN || role === USER_ROLE.MODERATOR)) {
    return res.status(401).json({ error: 'dont authorization' })
  }

  next()
}

module.exports = verifyRole
