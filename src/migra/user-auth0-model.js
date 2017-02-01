var mongoose = require('mongoose')

var userAuth0Schema = mongoose.Schema({
  email_verified: Boolean,
  email: String,
  username: String
}, { collection: 'user-auth0' })

module.exports = mongoose.model('UserAuth0', userAuth0Schema)
