const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()
mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = Promise

const app = express()
const db = mongoose.connection

db.on('error', (err) => console.log(err.message))

app.use(cors())

app.use('/viveros', require('./viveros'))

app.use('/especies', require('./especies'))

app.use('/migra', require('./migra'))

app.use(function (err, req, res, next) {
  console.log(err)
  if (err.name === 'UnauthorizedError') return res.status(401).send()
})

app.listen(7000)

console.log('Listening on http://localhost:7000')
