const express = require('express')
const app = express()
const port = process.env.PORT | 8080

const hello = async (req, res) => {
    res.send("Hello World")
}

app.get('/', hello)

app.disable('etag')
app.listen(port, () => console.log(`Service listening on port ${port}!`))

module.exports = app