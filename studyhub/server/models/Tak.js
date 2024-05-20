const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', taskSchema);
