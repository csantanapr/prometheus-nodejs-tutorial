const express = require('express')
const app = express()
const port = process.env.PORT | 8080

// Add /metrics endpoint
require('./metrics.js')(app)

app.get('/', async (req, res) => {
  res.send('Hello World')
})
app.disable('etag')
app.listen(port, () => console.log(`Service listening on port ${port}!`))

module.exports = app
