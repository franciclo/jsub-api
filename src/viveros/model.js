const mongoose = require('mongoose')

const Schema = mongoose.Schema

const viveroSchema = new Schema({
  type: String,
  geometry: {
    type: String,
    coordinates: [Number, Number]
  },
  properties: {
    id: String,
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
