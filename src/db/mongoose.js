const mongoose = require('mongoose')
const validator = require('validator')

const connectionURL = 'mongodb://127.0.0.1:27017/task-lister'

mongoose.connect(connectionURL, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true
})

const User = mongoose.model("User", {
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
    validate(value) {
      if(value.length < 6 ) {
        throw new Error("password not not enough!")
      } else if(value.includes("password")) {
        throw new Error("Don't include 'password' in your password!")
      }
    }
  }
})

const Task= mongoose.model("Task", {
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,

  }
})

// const me = new User({
//   name: "    Dave       ",
//   email: "EMAIL@EMAIL.COM",
//   password: "test123123"
// })

// me.save()
//   .then((res) => {
//     console.log("SAVED", res)
//   })
//   .catch((err) => {
//     console.log("SAVE ERROR", err)
//   })

  const task = new Task({
    description: "Tester                    123",
    completed: false
  })

  task.save()
    .then(() => {
      console.log("SAVED", task)
    })
    .catch((error) => {
      console.log('TASK NOT SAVED', error)
    })