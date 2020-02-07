const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-lister', {
  useNewUrlParser: true,
  useCreateIndex: true
})

const User = mongoose.model("User", {
  name: {
    type: String
  },
  age: {
    type: Number
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
  name: "me",
  age: "true"
})

// me.save()
//   .then((res) => {
//     console.log("SAVED", res)
//   })
//   .catch((err) => {
//     console.log("SAVE ERROR", err)
//   })

  const task = new Task({
    description: "Test task",
    completed: false
  })

  task.save()
    .then(() => {
      console.log("SAVED", task)
    })
    .catch((error) => {
      console.log('TASK NOT SAVED', error)
    })