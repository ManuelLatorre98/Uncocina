const {validationResult} = require('express-validator')

const validateResult = (req, res, next) => {
  try{
    validationResult(req).throw()
    return (next())
  }catch(err){
    res.status(403)
    console.log(err)
    res.send({errors: err.array()})
  }
}

module.exports = {validateResult}