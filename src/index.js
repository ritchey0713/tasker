const express = require('express')
require('./db/mongoose')
const Contractor = require("./models/contractor")
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/contractors', (req, res) => {
  const contractor = new Contractor(req.body)

  contractor.save()
    .then((result) => {
      res.send(contractor)
    })
    .catch((error) => {
      res.status(400).send(error)
    })
})

app.post('/tasks', (req, res) => {
  const task = new Task(req.body)
  task.save()
    .then(() => {
      res.send(task)
    })
    .catch((error) => {
      res.status(400).send(error)
    })
  
})

app.listen(port, () => {
  console.log(`server loaded at ${port}`)
})