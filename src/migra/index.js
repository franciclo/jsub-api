const express = require('express')
const User = require('./model')

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
    let usersAuth0 = users.map(user => {
      return {
        email_verified: true,
        email: user.email,
        username: user.name
      }
    })
    res.json(usersAuth0)
  })
})

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

router.get('/viveros', function(req, res) {
  User.find({emailVerified: true, arboles: { $ne: [] }}, function(err, users) {
    if(err) return res.json({err: err.message})
    let usersViveros = users.map(user => {
      const location = JSON.parse(user.location)
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [+location.lat.toFixed(4), +location.lng.toFixed(4)]
        },
        properties: {
          id: user.id,
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
    res.json(usersViveros)
  })
})

router.get('/viveros/map', function(req, res) {
  User.find({emailVerified: true, arboles: { $ne: [] }}, function(err, users) {
    if(err) return res.json({err: err.message})
    let usersViverosMap = users.map(user => {
      const location = JSON.parse(user.location)
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [+location.lat.toFixed(4), +location.lng.toFixed(4)]
        },
        properties: {
          id: user.id
        }
      }
    })
    res.json(usersViverosMap)
  })
})

module.exports = router
