const mongoose = require('mongoose')

const Schema = mongoose.Schema

const viveroMapSchema = new Schema({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [Number, Number]
  },
  properties: {
    id: String
  }
})

module.exports = mongoose.model('ViveroMap', viveroMapSchema);
