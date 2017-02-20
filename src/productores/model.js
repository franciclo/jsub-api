const mongoose = require('mongoose')
// require('../stock/model')

const Schema = mongoose.Schema

const productorSchema = new Schema({
  name: String,
  users: [String],
  coordinates: [Number],
  precios: [{ type : ObjectId, ref: 'Precio' }]
  stock: [{ type : ObjectId, ref: 'Stock' }]
}, { collection: 'productores' });

productorSchema.index({ name: 'text' });

module.exports = mongoose.model('Productor', productorSchema);
