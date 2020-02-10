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

app.get("/contractors", (req, res) => {
  Contractor.find({  })
    .then((contractors) => {
      res.send(contractors)
    })
    .catch((error) => {
      res.status(400).send(error)
    })
})

app.get("/contractors/:id", (req, res) => {
  const _id = req.params.id
  Contractor.findById(_id)
    .then((contractor) => {
      if(!contractor){
        return res.send(404).send()
      }
      res.send(contractor)
    })
    .catch((error) => {
      res.status(500).send()
    })
})

app.post('/tasks', (req, res) => {
  const task = new Task(req.body)
  
  task.save()
    .then(() => {
      res.send(task)
    })
    .catch((error) => {
      res.status(500).send()
    })
  
})

app.get("/tasks", (req, res) => {
  Task.find({  })
  .then((tasks) => {
    res.send(tasks)
  })
  .catch((error) => {
    res.status(500).send()
  })
})

app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id 
  Task.findById(_id)
    .then((task) => {
      if(!task) {
        return res.status(404).send()
      }
      res.send(task)
    })
    .catch((error) => {
      res.status(500).send()
    })
})

app.listen(port, () => {
  console.log(`server loaded at ${port}`)
})