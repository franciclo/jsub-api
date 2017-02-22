const express = require('express')
const ObjectID = require('mongodb').ObjectID
// const jwt = require('express-jwt')
const Producto = require('./model')

const router = express.Router()
// const authCheck = jwt({
//   secret: new Buffer(process.env.AUTH0_SECRET, 'base64'),
//   audience: process.env.AUTH0_CLIENT
// });

router.get('/:ids', function(req, res) {
  const ids = req.params.ids.split(',')

  const valid = ids.filter(id => ObjectID.isValid(id)).length > 0
  if(!valid) return res.sendStatus(500)

  Producto.find({_id: {$in: ids}})
    .then(function (productos) {
      res.json(productos
        .reduce((map, p) => {
          const id = p._id
          p._id = undefined
          map[id] = p
          return map
        }, {}))
    })
    .catch(err => {
      res.sendStatus(500)
    })
})
//
// router.post('/stock', authCheck, function(req, res) {
//   res.json({ola: 'fran'})
// })

module.exports = router
