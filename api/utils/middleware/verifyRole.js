const { USER_ROLE } = require('../USER_ROLE')

const verifyRole = (req, res, next) => {
  if ((req.role = USER_ROLE.USER)) {
    return res.status(401).json({ error: 'dont role authorization' })
  }

  next()
}

module.exports = verifyRole
