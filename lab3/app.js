const express = require('express')
const app = express()
const port = process.env.PORT | 8080

// Add /metrics endpoint
require('./metrics.js')(app)

let counter = 1
app.get('/', async (req, res) => {
  // simulate a slow request every 3 requests
  setTimeout(async () => {
    res.send('Hello World')
  }, counter++ % 3 === 0 ? 100 : 0)

})
app.disable('etag')
app.listen(port, () => console.log(`Service listening on port ${port}!`))

module.exports = app
