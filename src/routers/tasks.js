const express = require('express')
const Task = require("../models/task.js")
const auth = require("../middleware/auth")
const router = express.Router()

router.post('/tasks', auth, async(req, res) => {
  const task = new Task({
    ...req.body,
    contractor: req.contractor._id
  })

  try {
    await task.save()
    res.send(task)
  } catch(err) {
    res.status(500).send()
  }
})

router.get("/tasks", async(req, res) => {
  try {
    const tasks = await Task.find({ })
    res.send(tasks)
  }catch(err) {
    res.status(500).send()
  }

})

router.get("/tasks/:id", async(req, res) => {
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

router.patch("/tasks/:id", async(req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ["description", "completed"]
  const isValidUpdates = updates.every((update) => {
    return allowedUpdates.includes(update)
  })
  if(!isValidUpdates){
    res.status(400).send({ error: "invalid update" })
  }

  try{
    // set up to work with pre() and post() middleware
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    const task = await Task.findById(req.params.id)
    updates.forEach((update) => {
      task[update] = req.body[update]
    })
    await task.save()

    if(!task) {
      return res.status(400).send()
    }
    res.status(200).send(task)
  } catch(err) {
    res.status(400).send()
  }

})

router.delete("/tasks/:id", async(req, res) => {
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

module.exports = router