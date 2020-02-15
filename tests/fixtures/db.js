const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")
const Contractor = require("../../src/models/contractor.js")

const contractorOneId = new mongoose.Types.ObjectId()

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

const setupDb = async () => {
  await Contractor.deleteMany()
  await new Contractor(contractorOne).save()
}

module.exports = {
  contractorOneId,
  contractorOne,
  setupDb
}