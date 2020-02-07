const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-lister', {
  useNewUrlParser: true,
  useCreateIndex: true
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
  age: -1
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