var mongoose = require('mongoose')
// require('../producto/model')

var stockSchema = mongoose.Schema(
  {
    producto: { type : ObjectId, ref: 'Producto' }
    altura: String,
    cantidad: Number
  }
)

module.exports = mongoose.model('Stock', stockSchema)
