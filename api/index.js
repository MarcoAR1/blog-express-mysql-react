require('dotenv').config()
const app = require('./app.js')
const { PORT } = require('./utils/config.js')

app.set('port', PORT)

app.listen(PORT, () => {
  console.log(`Server running on port ${app.get('port')}`)
})
