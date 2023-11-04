const {check, expressValidator} = require('express-validator')
const {validateResult} = require('../../helpers/validateHelper')
const { getRecipe } = require('../../services/recipeService')
/* .custom(array => Array.isArray(array))
    .custom(array => array.length > 0), */
const validateRecipe=[
  check('recipe_name')
    .exists()
    .not()
    .isEmpty(),
  check('user_email')
    .exists()
    .isEmail()
    .not()
    .isEmpty(),
  check('user_name')
    .exists()
    .not()
    .isEmpty(),
  check('steps')
    .exists()
    .not()
    .isEmpty(),
  check('imageURL')
    .exists()
    .not()
    .isEmpty(),
  check('estimatedTime')
    .exists()
    .isInt(),
  check('difficulty')
    .exists()
    .not()
    .isEmpty()
    .custom(value => (value == 'Facil' || value == 'Media' || value == 'Dificil')),
  check('ingredients')
    .exists()
    .not()
    .isEmpty(),
  check('categories')
    .custom(array => {
      array = [].concat(array)
      return Array.isArray(array)})
    .custom(array => {
      array = [].concat(array)
      return array.length > 0}),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]
const validateNotExistRecipeParams = async(req, res, next) => {
  const data = req.params
  const recipe_rows = await validateNotExistRecipe(data)
  if(recipe_rows.length===0){//If the user doesn't exist already
    next()
  }else{//If the user does exist already
    res.status(409).json({error: "Recipe name already exist for user in data base"})
  }
}

const validateNotExistRecipeBody = async(req, res, next) => {
  const data = req.body
  const recipe_rows = await validateNotExistRecipe(data)
  if(recipe_rows.length===0){//If the user doesn't exist already
    next()
  }else{//If the user does exist already
    res.status(409).json({error: "Recipe name already exist for user in data base"})
  }
}

async function validateNotExistRecipe(data){
  const {recipe_name, user_name, user_email} = data
  const recipe_rows = await getRecipe(recipe_name, user_name, user_email)
  return recipe_rows
}


const validateExistRecipeParams = async(req, res, next) => {
  const data = req.params
  const recipe_rows = await validateExistRecipe(data)
  if(recipe_rows.length>0){
    next()
  }else{
    res.status(409).json({error: "Recipe not exist in data base"})
  }
}

const validateExistRecipeBody = async(req, res, next) => {
  const data = req.body
  const recipe_rows = await validateExistRecipe(data)
  if(recipe_rows.length>0){
    next()
  }else{
    res.status(409).json({error: "Recipe not exist in data base"})
  }
}

async function validateExistRecipe(data){
  const {recipe_name, recipe_user_name, recipe_user_email} = data
  const recipe_rows = await getRecipe(recipe_name,recipe_user_name, recipe_user_email)
  return recipe_rows
  
}

module.exports = {
  validateRecipe,
  validateExistRecipeParams,
  validateExistRecipeBody,
  validateNotExistRecipeParams,
  validateNotExistRecipeBody
}