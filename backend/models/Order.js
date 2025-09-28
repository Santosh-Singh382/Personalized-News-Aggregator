const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pharmacyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{ name:String, quantity:Number }],
  status: { type: String, enum: ['pending','processed','dispatched','delivered'], default: 'pending'},
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', OrderSchema);
