const express = require('express')
const ObjectID = require('mongodb').ObjectID
// const jwt = require('express-jwt')
const Productor = require('./model')

const router = express.Router()

// const authCheck = jwt({
//   secret: new Buffer(process.env.AUTH0_SECRET, 'base64'),
//   audience: process.env.AUTH0_CLIENT
// });

router.get('/:ids', function(req, res) {
  const ids = req.params.ids.split(',')

  const valid = ids.filter(id => ObjectID.isValid(id)).length > 0
  if(!valid) return res.sendStatus(500)

  console.log(ids)
  Productor.find({_id: {$in: ids}})
    .populate('stock precios')
    .then(function (productores) {
      console.log(productores)
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

      res.json(productoresStock
        .reduce((map, p) => { map[p.properties.id] = p; return map }, {}))
  })
  .catch(err => {
    console.log(err)
    res.sendStatus(500)
  })
})
//
// router.post('/stock', authCheck, function(req, res) {
//   res.json({ola: 'fran'})
// })

module.exports = router
