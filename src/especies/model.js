var mongoose = require('mongoose')

var especieSchema = mongoose.Schema(
  {
    especieId: String,
    label: String,
    latin: String,
    tipo: String
  }
)

module.exports = mongoose.model('Especie', especieSchema)
