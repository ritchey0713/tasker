const express = require('express')
require('./db/mongoose')
const Contractor = require("./models/contractor")
const Task = require('./models/task')
const contractorRouter = require("./routers/contractors.js")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(contractorRouter)



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