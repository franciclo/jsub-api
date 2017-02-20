const mongoose = require('mongoose')
// require('../stock/model')

const Schema = mongoose.Schema

const productorSchema = new Schema({
  coordinates: [Number],
  users: [String],
  name: String,
  stock: [{ type : ObjectId, ref: 'Stock' }]
});

productorSchema.index({ name: 'text' });

module.exports = mongoose.model('Productor', productorSchema);
