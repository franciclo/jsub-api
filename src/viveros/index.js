const express = require('express')
const jwt = require('express-jwt')

const router = express.Router()
const authCheck = jwt({
  secret: new Buffer(process.env.AUTH0_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT
});

router.get('/:id', function(req, res) {
  res.json({ola: 'mundo'})
})

router.post('/:id', authCheck, function(req, res) {
  res.json({ola: 'fran'})
})

module.exports = router
