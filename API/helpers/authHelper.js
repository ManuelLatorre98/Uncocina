const jwt = require('jsonwebtoken')
require('dotenv').config()

function generateToken(user){
  const token= jwt.sign({id:user.email}, process.env.SECRET)
  return token
}

module.exports = {generateToken}