const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const contractorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if(value < 0) {
        throw new Error("age must be a positive number")
      }
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error("Invalid Email")
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 7,
    validate(value) {
      if(value.length < 6 ) {
        throw new Error("password long not enough!")
      } else if(value.toLowerCase().includes("password")) {
        throw new Error("Don't include 'password' in your password!")
      }
    }
  }
})

// normal func have to bind this
contractorSchema.pre("save", async function(next) {
  const contractor = this

  if(contractor.isModified('password')) {
    contractor.password = await bcrypt.hash(contractor.password, 8)
  }
  next()
})

const Contractor = mongoose.model("User", contractorSchema)

module.exports = Contractor