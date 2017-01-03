const express = require('express');
const jwt = require('express-jwt');
const arbolesByUser = require('./arboles.js').arbolesByUser
const arbolEdit = require('./arboles.js').arbolEdit

const authCheck = jwt({
  secret: new Buffer(process.env.AUTH0_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT
});

const router = express.Router();

router.get('/users/:id/arboles', arbolesByUser)

router.post('/arboles/:id', authCheck, arbolEdit)

module.exports = router
