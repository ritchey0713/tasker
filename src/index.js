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

})

app.patch("/contractors/:id", async(req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdate = ["name", "age", "email", "password"]
  const isValidUpdates = updates.every((update) => {
    return allowedUpdate.includes(update)
  })

  if(!isValidUpdates) {
    return res.status(400).send({ error: "Invalid updates"})
  }

  try{
    const contractor = await Contractor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if(!contractor) {
      return res.status(404).send()
    }
    res.status(200).send(contractor)
  } catch(err){
    res.status(400).send(err)
  }
})

app.delete("/contractors/:id", async(req, res) => {
  try {
    const contractor = await Contractor.findByIdAndDelete(req.params.id)

    if(!contractor) {
      return res.status(404),send()
    }

    res.send(contractor)
  }catch(e) {
    res.status(500).send()
  }
})

app.post('/tasks', async(req, res) => {

  try {
    const task = await new Task(req.body)
    res.send(task)
  } catch(err) {
    res.status(500).send()
  }
  
})

app.get("/tasks", async(req, res) => {
  try {
    const tasks = await Task.find({ })
    res.send(tasks)
  }catch(err) {
    res.status(500).send()
  }

})

app.get("/tasks/:id", async(req, res) => {
  const _id = req.params.id 

  try {
    const task = await Task.findById(_id)
    if(!task) {
      return res.status(404).send()
    }
    res.send(task)
  }catch(err){
    res.status(500).send()
  }
})

app.patch("/tasks/:id", async(req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ["description", "completed"]
  const isValidUpdates = updates.every((update) => {
    return allowedUpdates.includes(update)
  })
  if(!isValidUpdates){
    res.status(400).send({ error: "invalid update" })
  }

  try{
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if(!task) {
      return res.status(400).send()
    }
    res.status(200).send(task)
  } catch(err) {
    res.status(400).send()
  }

})

app.delete("/tasks/:id", async(req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task){
      return res.status(400).send()
    }
    res.send(task)
  } catch(err) {
    res.status(500).send()
  } 
})

app.listen(port, () => {
  console.log(`server loaded at ${port}`)
})