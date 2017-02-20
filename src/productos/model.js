var mongoose = require('mongoose')

var productoSchema = mongoose.Schema({
  name: String,
  latin: String,
  tipo: String,
  madurez: Number
})

productoSchema.index({ name: 'text', latin: 'text' });

module.exports = mongoose.model('Producto', productoSchema)
