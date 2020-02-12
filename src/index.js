const express = require('express')
require('./db/mongoose')

const contractorRouter = require("./routers/contractors.js")
const taskRouter = require("./routers/tasks.js")

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//   console.log(req.method, req.path)
//   if(req.method === "GET") {
//     res.send("GET requests are disabled")
//   } else {
//     next()
//   }
  
// })

// app.use((req, res, next) => {
//   res.status(503).send("Under maintenance!!")
// })

app.use(express.json())
app.use(contractorRouter, taskRouter)

// without middleware => new request => run route handler

// with middleware => new request => do something => run route handler

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