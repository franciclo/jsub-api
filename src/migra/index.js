const express = require('express')
const User = require('./model')
const UserAuth0 = require('./user-auth0-model')
const Vivero = require('../viveros/model')
const Especie = require('../especies/model')
const especiesData = require('./especies-data')
const router = express.Router()

router.get('/usuarios', function(req, res) {
  User.find({}, function(err, users) {
    if(err) return res.json({err: err.message})
    res.json(users)
  })
})

router.get('/usuarios/auth0', function(req, res) {
  User.find({emailVerified: true, name: { $exists: true, $ne: '' }}, function(err, users) {
    if(err) return res.json({err: err.message})
    UserAuth0.remove({}, function(err) {
      if(err) return res.json({err: err.message})
      let usersAuth0 = users.map(user => {
        return {
          email_verified: true,
          email: user.email,
          username: user.name
        }
      })
      usersAuth0.forEach(user => {
        const newUser = new UserAuth0(user)
        newUser.save(err => { if(err) throw new Error(err) })
      })
      res.sendStatus(200)
    })
  })
})

router.get('/viveros', function(req, res) {
  function tamagno (n) {
    switch (n) {
      case '1':
       return 'brote'
      case '2':
       return 'plantin'
      case '3':
       return 'mediano'
      case '4':
       return 'maduro'
      case '5':
       return 'grande'
      default:
       throw new Error('tamaño desconocido')
    }
  }

  User.find({emailVerified: true, arboles: { $ne: [] }}, function(err, users) {
    if(err) return res.json({err: err.message})
    Vivero.remove({}, function(err) {
      if(err) return res.json({err: err.message})

      let usersViveros = users.map(user => {
        const location = JSON.parse(user.location)
        return {
          geometry: {
            coordinates: [+location.lng, +location.lat]
          },
          properties: {
            user: user.id,
            stock: user.arboles.reduce((stock, arbol) => {
              const arbolI = stock
                .map(arbol => arbol.especie)
                .indexOf(arbol.especie)

              if(~arbolI) {
                stock[arbolI].cantidades.push({
                  tipo: tamagno(arbol.tamagno),
                  cantidad: arbol.cantidad
                })
              } else {
                let newArbol = {
                  especie: arbol.especie,
                  cantidades: []
                }

                newArbol.cantidades.push({
                  tipo: tamagno(arbol.tamagno),
                  cantidad: arbol.cantidad
                })

                stock.push(newArbol)
              }

              return stock
            }, [])
          }
        }
      })

      usersViveros.forEach(vivero => {
        const newVivero = new Vivero(vivero)
        newVivero.save(err => { if(err) throw new Error(err) })
      })

      res.json(usersViveros)
    })
  })
})

router.get('/viveros/map', function(req, res) {
  Vivero.find({}, function(err, viveros) {
    if(err) return res.json({err: err.message})
    let viverosMap = {
      type: 'FeatureCollection',
      features: viveros.map(vivero => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: vivero.geometry.coordinates
          },
          properties: {
            id: vivero.id
          }
        })
      )
    }
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Content-Disposition', 'attachment; filename=viveros.geojson')
    res.end(JSON.stringify(viverosMap))
    // res.json(viverosMap)
  })
})

router.get('/especies', function(req, res) {
  Especie.remove({}, function(err) {
    if(err) res.sendStatus(500)
    especiesData.forEach(function(esp) {
      const newEspecie = new Especie({
        especieId: esp.id,
        label: esp.label,
        latin: esp.latin,
        tipo: esp.tipo
      })
      newEspecie.save(err => { if(err) res.json(err) })
    })
  })
  res.sendStatus(200)
})
module.exports = router
