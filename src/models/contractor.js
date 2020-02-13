const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const Task = require("./task.js")
const multer = require('multer')


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
    unique: true,
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
  },
  avatar: {
    type: Buffer
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    }
  }]
}, {
  timestamps: true
})


// virutal assocs to tasks
contractorSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "contractor"
})

// file uploads
contractorSchema.statics.uploads = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    // if(!file.originalname.match(/\.(doc|docx)$/)) {
      if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Avatar should be of type jpg, jpeg or png!"))
    }
    
    // cb(new Error("file must be PDF"))

    cb(undefined, true)
  }
})

// gen jwt token 
contractorSchema.methods.generateAuthToken = async function() {
  const contractor = this
  const token = jwt.sign({ _id: contractor._id.toString() }, "thisismynewtoken")

  contractor.tokens = contractor.tokens.concat({ token })
  await contractor.save()
  return token

}

//protect user data 
contractorSchema.methods.toJSON = function() {
  const contractor = this 
  const publicObj = contractor.toObject()
  delete publicObj.password
  delete publicObj.tokens

  return publicObj
}

// validate email/password

contractorSchema.statics.findByCredentials = async(email, password) => {
  const contractor = await Contractor.findOne({ email })


  if(!contractor) {
    throw new Error("Unable to log in!")
  }

  const isMatch = await bcrypt.compare(password, contractor.password)
  if(!isMatch) {
    throw new Error("Unable to log in!")
  }
  return contractor
}

// hash password normal func have to bind this
contractorSchema.pre("save", async function(next) {
  const contractor = this

  if(contractor.isModified('password')) {
    contractor.password = await bcrypt.hash(contractor.password, 8)
  }
  next()
})

//middleware to delete tasks when removing account
contractorSchema.pre("remove", async function(next) {
  const contractor = this 
  await Task.deleteMany({ contractor: contractor._id })
  next()
})

const Contractor = mongoose.model("Contractor", contractorSchema)

module.exports = Contractor