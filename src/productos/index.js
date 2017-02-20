const express = require('express')
// const jwt = require('express-jwt')
const Producto = require('./model')

const router = express.Router()
// const authCheck = jwt({
//   secret: new Buffer(process.env.AUTH0_SECRET, 'base64'),
//   audience: process.env.AUTH0_CLIENT
// });

router.get('/:ids', function(req, res) {
  const ids = req.params.ids.split(',')
  Producto.find({id: {$in: ids}}, function (err, productos) {
    if(err) return res.sendStatus(500)
    res.json(productos)
  })
})
//
// router.post('/stock', authCheck, function(req, res) {
//   res.json({ola: 'fran'})
// })

module.exports = router
