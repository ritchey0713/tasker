const express = require('express')
const Contractor = require("../models/contractor")
const router = express.Router()
const auth = require("../middleware/auth.js")

router.post('/contractors', async(req, res) => {
  const contractor = new Contractor(req.body)

  try {
    await contractor.save()
    const token = await contractor.generateAuthToken()
    res.status(201).send({ contractor, token })
  } catch(err) {
    res.status(400).send(err)
  }

})

router.post("/contractors/login", async (req, res) => {
  try {
    const contractor = await Contractor.findByCredentials(req.body.email, req.body.password)
    const token = await contractor.generateAuthToken()
    res.send({ contractor, token })
  }catch(err) {
    res.status(400).send()
  }
})

router.post("/contractors/logout", auth, async (req, res) => {
  try {
    req.contractor.tokens = req.contractor.tokens.filter((token) => {
      return token.token != req.token
    })
    await req.contractor.save()

    res.send()
  } catch(err) {
    res.status(500).send()
  }
})


// for admin use
router.get("/contractors", auth, async(req, res) => {
  try {
    const contractors = await Contractor.find({  })
    res.status(200).send(contractors)
  }catch(err) {
    res.status(400).send(err)
  }
})


router.get("/contractors/me", auth, async(req, res) => {
  res.send(req.contractor)
})

router.get("/contractors/:id", async(req, res) => {
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

router.patch("/contractors/:id", async(req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdate = ["name", "age", "email", "password"]
  const isValidUpdates = updates.every((update) => {
    return allowedUpdate.includes(update)
  })

  if(!isValidUpdates) {
    return res.status(400).send({ error: "Invalid updates"})
  }

  try{
    // will not run with pre() middleware
    //const contractor = await Contractor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    const contractor = await Contractor.findById(req.params.id)

    // for use with pre() and post() middleware
    updates.forEach((update) => {
      contractor[update] = req.body[update]
    })

    await contractor.save()

    if(!contractor) {
      return res.status(404).send()
    }
    res.status(200).send(contractor)
  } catch(err){
    res.status(400).send(err)
  }
})

router.delete("/contractors/:id", async(req, res) => {
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

module.exports = router