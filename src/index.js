const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/contractors', (req, res) => {
  console.log(req.body)
  res.send("testing")
})

app.listen(port, () => {
  console.log(`server loaded at ${port}`)
})