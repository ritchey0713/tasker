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

const Task = require("./models/task")
const Contractor = require("./models/contractor.js")

const main = async () => {
  // const task = await Task.findById("5e44439b028590311ee127b6")
  // await task.populate("contractor").execPopulate()
  // console.log(task.contractor)

  const contractor = await Contractor.findById("5e4442508f48c52f621a80a7")
  await contractor.populate("tasks").execPopulate()
  console.log(contractor.tasks)

}

main()