const mongoose = require('mongoose');
const PrescSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  medications: [{ name:String, dosage:String, instructions:String }],
  notes: String,
  issuedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Prescription', PrescSchema);
