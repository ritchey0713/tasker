const express = require('express')
require('./db/mongoose')
const Contractor = require("./models/contractor")
const Task = require('./models/task')
const contractorRouter = require("./routers/contractors.js")
const taskRouter = require("./routers/tasks.js")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(contractorRouter, taskRouter)




app.listen(port, () => {
  console.log(`server loaded at ${port}`)
})