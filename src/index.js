const express = require('express')
require('./db/mongoose')

const contractorRouter = require("./routers/contractors.js")
const taskRouter = require("./routers/tasks.js")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(contractorRouter, taskRouter)

app.listen(port, () => {
  console.log(`server loaded at ${port}`)
})

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//   const token = jwt.sign({ _id: "abc123" }, 'thisismynewtoken', {expiresIn: '0 second'})
//   console.log(token)
//   const data = jwt.verify(token, 'thisismynewtoken')
//   console.log(data)
// }

// myFunction()