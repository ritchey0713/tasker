const mongoose = require('mongoose')
const validator = require('validator')

const Contractor = mongoose.model("User", {
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
    minlength: 7,
    validate(value) {
      if(value.length < 6 ) {
        throw new Error("password long not enough!")
      } else if(value.toLowerCase().includes("password")) {
        throw new Error("Don't include 'password' in your password!")
      }
    }
  }
})

module.exports = Contractor