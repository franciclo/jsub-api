const express = require('express')
// const jwt = require('express-jwt')
const Productor = require('./model')

const router = express.Router()

// const authCheck = jwt({
//   secret: new Buffer(process.env.AUTH0_SECRET, 'base64'),
//   audience: process.env.AUTH0_CLIENT
// });

router.get('/:ids', function(req, res) {
  const ids = req.params.ids.split(',')

  Productor.find({_id: {$in: ids}})
    .populate('stock precios')
    .then(function (productores) {
      if(err) return res.sendStatus(500)
      const productoresStock = productores.map(productor => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: productor.coordinates
          },
          properties: {
            id: productor.id,
            stock: productor.stock
          }
        })
      )

      res.json(productoresStock)
  })
  .catch(err => { console.log(err) })
})
//
// router.post('/stock', authCheck, function(req, res) {
//   res.json({ola: 'fran'})
// })

module.exports = router
