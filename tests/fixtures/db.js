const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")
const Contractor = require("../../src/models/contractor.js")
const Task = require("../../src/models/task.js")

const contractorOneId = new mongoose.Types.ObjectId()
const contractorTwoId = new mongoose.Types.ObjectId()

const contractorOne = {
  _id: contractorOneId,
  name: "Mike",
  email: "Mike@mike.com",
  password: "Mike123",
  tokens: [{
    token: jwt.sign({
      _id: contractorOneId
    }, process.env.JWT_TOKEN)
  }]
}

const contractorTwo = {
  _id: contractorTwoId,
  name: "Sarah",
  email: "sarah@sarah.com",
  password: "Sarah123",
  tokens: [{
    token: jwt.sign({
      _id: contractorTwoId
    }, process.env.JWT_TOKEN)
  }]
}

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "First test task",
  completed: true,
  contractor: contractorOneId
}


const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Second test task",
  contractor: contractorTwoId
}

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Third test task",
  contractor: contractorOneId,
}


const setupDb = async () => {
  await Contractor.deleteMany()
  await Task.deleteMany()
  await new Contractor(contractorOne).save()
  await new Contractor(contractorTwo).save()
  await new Task(taskOne).save()
  await new Task(taskTwo).save()
  await new Task(taskThree).save()
}

module.exports = {
  contractorOneId,
  contractorTwoId,
  contractorOne,
  contractorTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupDb
}