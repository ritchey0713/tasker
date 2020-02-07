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
    required: true
  },
  age: {
    type: Number,
    validate(value) {
      if(value < 0) {
        throw new Error("age must be a positive number")
      }
    }
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error("Invalid Email")
      }
    }
  }
})

const Task= mongoose.model("Task", {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
})

const me = new User({
  name: "Dave",
  email: "mike@mike.com"
})

me.save()
  .then((res) => {
    console.log("SAVED", res)
  })
  .catch((err) => {
    console.log("SAVE ERROR", err)
  })

  // const task = new Task({
  //   description: "Test task",
  //   completed: false
  // })

  // task.save()
  //   .then(() => {
  //     console.log("SAVED", task)
  //   })
  //   .catch((error) => {
  //     console.log('TASK NOT SAVED', error)
  //   })