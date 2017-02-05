const express = require('express')
// const jwt = require('express-jwt')
const Vivero = require('../viveros/model')

const router = express.Router()
// const authCheck = jwt({
//   secret: new Buffer(process.env.AUTH0_SECRET, 'base64'),
//   audience: process.env.AUTH0_CLIENT
// });

router.get('/stock/:ids', function(req, res) {
  const ids = req.params.ids.split(',')

  Vivero.find({_id: {$in: ids}}, function (err, viveros) {
    if(err) return res.sendStatus(500)
    const viverosStock = viveros.map(vivero => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: vivero.geometry.coordinates
        },
        properties: {
          id: vivero.id,
          stock: vivero.properties.stock
        }
      })
    )

    res.json(viverosStock)
  })
})
//
// router.post('/stock', authCheck, function(req, res) {
//   res.json({ola: 'fran'})
// })

module.exports = router
