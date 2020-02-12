const mongoose = require('mongoose')

const Task= mongoose.model("Task", {
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  contractor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Contractor"

  }
})

module.exports = Task