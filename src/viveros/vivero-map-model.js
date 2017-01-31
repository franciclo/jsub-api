const mongoose = require('mongoose')

const Schema = mongoose.Schema

const viveroMapSchema = new Schema({
  type: String,
  geometry: {
    type: String,
    coordinates: [Number, Number]
  },
  properties: {
    id: String
  }
})

module.exports = mongoose.model('ViveroMap', viveroMapSchema);
