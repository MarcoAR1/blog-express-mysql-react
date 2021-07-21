const express = require('express')
const path = require('path')
require('express-async-errors')
const cors = require('cors')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')

const app = express()

app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan')
  app.use(
    morgan(
      ':method :url :status :res[content-length] - :response-time ms :json'
    )
  )
  morgan.token('json', (req) => {
    return JSON.stringify(req.body)
  })
}

app.use('/', express.static(path.join(__dirname, 'dist')))
app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)
module.exports = app
