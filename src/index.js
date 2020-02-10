const express = require('express')
require('./db/mongoose')
const Contractor = require("./models/contractor")
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/contractors', async(req, res) => {
  const contractor = new Contractor(req.body)

  try {
    await contractor.save()
    res.status(201).send(contractor)
  } catch(err) {
    res.status(400).send(err)
  }

})

app.get("/contractors", async(req, res) => {
  try {
    const contractors = await Contractor.find({  })
    res.status(200).send(contractors)
  }catch(err) {
    res.status(400).send(err)
  }
})

app.get("/contractors/:id", async(req, res) => {
  const _id = req.params.id

  try {
    const contractor = await Contractor.findById(_id)
    if(!contractor){
      return res.status(404).send()
    }
    res.send(contractor)
  }catch(err) {
    res.status(500).send()
  }


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