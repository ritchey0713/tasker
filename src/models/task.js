const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
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
}, {
  timestamps: true
})

const Task = mongoose.model("Task", taskSchema)

module.exports = Task