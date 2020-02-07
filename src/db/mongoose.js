const mongoose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017/task-lister'

mongoose.connect(connectionURL, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true
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

