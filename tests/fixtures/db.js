const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")

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