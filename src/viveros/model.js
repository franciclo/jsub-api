const mongoose = require('mongoose')

const Schema = mongoose.Schema

const viveroSchema = new Schema({
    location: String,
    stock: [{
      especie: String,
      semillas: Number,
      brotes: Number,
      plantines: Number,
      medianos: Number,
      maduro: Number,
      grande: Number
    }],
});

module.exports = mongoose.model('Vivero', viveroSchema);
