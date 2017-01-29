const express = require('express');
const User = require('./model')

const router = express.Router();

router.get('/usuarios', function(req, res) {
  User.find({}, function(err, users) {
    if(err) return res.json({err: err})
    res.json(users)
  })
})

module.exports = router
