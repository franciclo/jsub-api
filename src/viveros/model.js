const mongoose = require('mongoose')

const Schema = mongoose.Schema

const viveroSchema = new Schema({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [Number, Number]
  },
  properties: {
    id: String
    stock: [{
      especie: String,
      semillas: Number,
      brotes: Number,
      plantines: Number,
      medianos: Number,
      maduro: Number,
      grande: Number
    }],
  }
});

module.exports = mongoose.model('Vivero', viveroSchema);
