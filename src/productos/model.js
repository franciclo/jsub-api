const mongoose = require('mongoose')

const productoSchema = mongoose.Schema({
  name: String,
  latin: String,
  tipo: String,
  mesesMadurez: Number
})

productoSchema.index({ name: 'text', latin: 'text' })

module.exports = mongoose.model('Producto', productoSchema)
