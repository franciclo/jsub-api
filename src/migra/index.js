const express = require('express')
const User = require('./model')
const UserAuth0 = require('./user-auth0-model')
const Vivero = require('../viveros/model')

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
            coordinates: [+location.lng.toFixed(4), +location.lat.toFixed(4)]
          },
          properties: {
            user: user.id,
            stock: user.arboles.reduce((stock, arbol) => {
              const arbolI = stock
                .map(arbol => arbol.especie)
                .indexOf(arbol.especie)

              if(~arbolI) {
                stock[arbolI][tamagno(arbol.tamagno)] = arbol.cantidad
              } else {
                let newArbol = {
                  especie: arbol.especie
                }

                newArbol[tamagno(arbol.tamagno)] = arbol.cantidad
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
      res.sendStatus(200)
      // res.json(usersViveros)
    })
  })
})

router.get('/viveros/map', function(req, res) {
  Vivero.find({emailVerified: true, arboles: { $ne: [] }}, function(err, viveros) {
    if(err) return res.json({err: err.message})
    let viverosMap = {
      type: 'FeatureCollection',
      features: viveros.map(vivero => {
        vivero.type = 'Feature'
        vivero.geometry.type = 'Point'
        delete vivero.properties.stock
        return vivero
      })
    }
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Content-Disposition', 'attachment; filename=viveros.geojson')
    res.end(JSON.stringify(viverosMap))
  })
})

module.exports = router
