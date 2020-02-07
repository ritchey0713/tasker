const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.post('/contractors', (req, res) => {
  res.send("testing")
})

app.listen(port, () => {
  console.log(`server loaded at ${port}`)
})