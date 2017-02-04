const mongoose = require('mongoose')

const Schema = mongoose.Schema

const viveroSchema = new Schema({
  geometry: {
    coordinates: [Number]
  },
  properties: {
    user: String,
    stock: [{
      // especie: String,
      // cantidades : [
      //   {
      //     tipo: String,
      //     cantidad: Number
      //   }
      // ]
    }]
  }
});

module.exports = mongoose.model('Vivero', viveroSchema);
