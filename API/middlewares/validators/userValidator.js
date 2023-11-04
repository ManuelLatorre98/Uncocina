const {check} = require('express-validator')
const {validateResult} = require('../../helpers/validateHelper')
const {getUser, getUserEmailOrName, getFav, getCalif} = require('../../services/userService')
const validateLogon=[
  check('user_email')
    .exists()
    .isEmail()
    .not()
    .isEmpty(),
  check('user_name')
    .exists()
    .not()
    .isEmpty(),
  check('password')
    .exists()
    .matches(/^(?=.*\d)[0-9a-zA-Z]{4,}$/, "i"), //5 caracteres minimo
  (req, res, next) => {
    validateResult(req, res, next)
  }
]
const validateExistUserBody = async(req, res, next) => {
  const data=req.body 
  user_rows = await validateExistUser(data)
  if(user_rows.length>0){//If the user does exist already
    next()
  }else{//If the user doesn't exist already
    
    res.status(409).json({error: "User not exist in data base"})
  }
}

const validateExistUserParams = async(req, res, next) => {
  const data=req.params
  user_rows = await validateExistUser(data)
  if(user_rows.length>0){//If the user does exist already
    next()
  }else{//If the user doesn't exist already
    res.status(409).json({error: "User not exist in data base"})
  }
}

const validateExistUserQuery = async(req, res, next) => {
  
  const data=req.query
  user_rows = await validateExistUser(data)
  if(user_rows.length>0){//If the user does exist already
    next()
  }else{//If the user doesn't exist already
    res.status(409).json({error: "User not exist in data base"})
  }
}

async function validateExistUser(data){
  const {user_email, user_name} = data
  const user_rows = await getUser(user_email, user_name)
  return user_rows
}

const validateExistUserEmailOrNameBody = async(req, res, next) => {
  const data = req.body
  const user_rows = await validateExistUserEmailOrName(data)
  if(user_rows.length>0){//If the user does exist already
    next()
  }else{//If the user doesn't exist already
    res.status(409).json({error: "User not exist in data base"})
  }
}

const validateNotExistUserParams = async(req, res, next) => {
  const {user_email, user_name} = req.params
  const user_rows = await getUserEmailOrName(user_email, user_name)
  if(user_rows.length===0){//If the user doesn't exist already
    next()
  }else{//If the user does exist already
    res.status(409).json({error: "Email or Name already exist in data base"})
  }
}

async function validateExistUserEmailOrName(data){
  const {user_email, user_name} = data
  const user_rows = await getUserEmailOrName(user_email, user_name)
  return user_rows
}

const validateExistUserEmailOrNameParams = async(req, res, next) => {
  const data = req.params
  const user_rows = await validateExistUserEmailOrName(data)
  if(user_rows.length>0){//If the user does exist already
    next()
  }else{//If the user doesn't exist already
    res.status(409).json({error: "User not exist in data base"})
  }
}

const validateNotExistUserBody = async(req, res, next) => {
  const {user_email, user_name} = req.body
  const user_rows = await getUserEmailOrName(user_email, user_name)
  console.log(user_rows)
  if(user_rows.length===0){//If the user doesn't exist already
    next()
  }else{//If the user does exist already
    res.status(409).json({error: "Email or Name already exist in data base"})
  }
}

const validateNotExistFav = async(req, res, next) => {
  const {recipe_name, recipe_user_email, recipe_user_name, user_email, user_name} = req.body
  favRow= await getFav(recipe_name, recipe_user_email, recipe_user_name, user_email, user_name)
  if(favRow.length === 0){
    next()
  }else{//If the user doesn't exist already
    res.status(409).json({error: "Fav already exist in data base"})
  }
}

const validateExistFav =  async(req, res, next) => {
  const {recipe_name, recipe_user_email, recipe_user_name, user_email, user_name} = req.body
  favRow= await getFav(recipe_name, recipe_user_email, recipe_user_name, user_email, user_name)
  if(favRow.length > 0){
    next()
  }else{//If the user doesn't exist already
    res.status(409).json({error: "Fav does not exist in database"})
  }
}

const validateNotExistCalif = async(req, res, next) => {
  const {recipe_name, recipe_user_email, recipe_user_name, user_email, user_name} = req.body
  favRow= await getCalif(recipe_name, recipe_user_email, recipe_user_name, user_email, user_name)
  if(favRow.length === 0){
    next()
  }else{//If the user doesn't exist already
    res.status(409).json({error: "Calification already exist in data base"})
  }
}

const validateExistCalif =  async(req, res, next) => {
  const {recipe_name, recipe_user_email, recipe_user_name, user_email, user_name} = req.body
  favRow= await getCalif(recipe_name, recipe_user_email, recipe_user_name, user_email, user_name)
  if(favRow.length > 0){
    next()
  }else{//If the user doesn't exist already
    res.status(409).json({error: "Calification does not exist in database"})
  }
}

module.exports = {
  validateLogon,
  validateNotExistUserBody,
  validateNotExistUserParams,
  validateExistUserBody,
  validateExistUserParams,
  validateExistUserEmailOrNameBody,
  validateExistUserEmailOrNameParams,
  validateNotExistFav,
  validateExistFav,
  validateExistCalif,
  validateNotExistCalif,
  validateExistUserQuery
}