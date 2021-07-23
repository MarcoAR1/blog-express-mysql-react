const ERROR_TYPE = {
  ValidationError: (res, err) => res.status(400).send(err),
  JsonWebTokenError: (res) =>
    res.status(401).json({ error: 'token missing or invalid' }),
  TokenExpiredError: (res) => res.status(401).json({ error: 'token expired' }),
  Error: (res, err) => {
    if (err.code === 'ER_DUP_ENTRY') {
      const duplicate = err.sqlMessage.split(' ')[2]
      res.status(400).json({ message: duplicate })
    }
  },
  default: (res, err) => res.status(500).send(err),
}
const handleError = (err, req, res, next) => {
  console.error(err)
  console.error(err.name)
  ERROR_TYPE[err.name]
    ? ERROR_TYPE[err.name](res, err)
    : ERROR_TYPE.default(res, err, next)
}

module.exports = { handleError }
