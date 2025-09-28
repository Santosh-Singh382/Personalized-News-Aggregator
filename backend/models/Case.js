const mongoose = require('mongoose');
const CaseSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  notes: String,
  attachments: [String],
  status: { type: String, enum: ['open','consulting','closed'], default: 'open' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Case', CaseSchema);
