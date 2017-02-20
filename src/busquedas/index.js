const express = require('express')
const Productor = require('../productor/model')
const Producto = require('../producto/model')

const router = express.Router()

router.get('/:query', function(req, res) {
  Productor.find(
        { $text : { $search : req.params.query } },
        { score : { $meta: "textScore" } }
    )
    .sort({ score : { $meta : 'textScore' } })
    .exec(function(err, productores) {
      if(err) return res.sendStatus(500)
      productores = productores || []

      Producto.find(
        { $text : { $search : req.params.query } },
        { score : { $meta: "textScore" } }
      )
      .sort({ score : { $meta : 'textScore' } })
      .exec(function(err, productos) {
          if(err) return res.sendStatus(500)
          productos = productos || []
          res.json(productos.concat(productores))
      });
  })
  .catch(err => { console.log(err) })
})

module.exports = router
