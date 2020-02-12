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

//GET /tasks?completed=true
router.get("/tasks", auth, async(req, res) => {
  const match = {}

  if(req.query.completed) {
    match.completed = req.query.completed === "true"
  }

  try {
    //const tasks = await Task.find({ contractor: req.contractor._id })
    await req.contractor.populate({
      path: "tasks",
      match
    }).execPopulate()
    res.send(req.contractor.tasks)
  }catch(err) {
    res.status(500).send()
  }

})

router.get("/tasks/:id", auth, async(req, res) => {
  const _id = req.params.id 

  try {
    //const task = await Task.findById(_id)
    const task = await Task.findOne({ _id, contractor: req.contractor._id })
    if(!task) {
      return res.status(404).send({error: "No task found!"})
    }
    res.send(task)
  }catch(err){
    res.status(500).send()
  }
})

router.patch("/tasks/:id", auth, async(req, res) => {
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
    //const task = await Task.findById(req.params.id)
    const task = await Task.findOne({_id: req.params.id, contractor: req.contractor._id})

    if(!task) {
      return res.status(404).send({error: "No task found!"})
    }
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

router.delete("/tasks/:id", auth, async(req, res) => {
  try {
    //const task = await Task.findByIdAndDelete(req.params.id)
    const task = await Task.findOneAndDelete({_id: req.params.id, contractor: req.contractor._id })
    if(!task){
      return res.status(400).send()
    }
    res.send(task)
  } catch(err) {
    res.status(500).send()
  } 
})

module.exports = router