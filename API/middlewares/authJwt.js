const jwt = require('jsonwebtoken')
const { getUser } = require('../services/userService')
require('dotenv').config()

const verifyToken = async(req, res, next) => {
  const token = req.headers.authorization.replace(/^Bearer\s+/, "")
  if(token){
    try{
      const decoded = jwt.verify(token, process.env.SECRET)
      if(decoded){
        next()
      }else{
        res.status(404).json({message: 'No user found'})
      }
    }catch(err){
      console.log("TOKEN ERROR: ", err.message)
      res.status(401).json({message: `Token error: ${err.message}` })
    }
  }else{
    res.status(403).json({message: 'No token provided'})
  }
}

module.exports = {verifyToken}