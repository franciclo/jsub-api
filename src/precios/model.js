var mongoose = require('mongoose')
// require('../producto/model')

var precioSchema = mongoose.Schema(
  {
    producto: { type : ObjectId, ref: 'Producto' }
    precio: Number
  }
)

module.exports = mongoose.model('Precio', precioSchema)
