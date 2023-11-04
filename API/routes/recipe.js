const express = require('express')
const router = express.Router()
const recipeController = require('../controllers/recipeController')
const {verifyToken} = require('../middlewares/authJwt')
const { validateExistSetOfCategories } = require('../middlewares/validators/categoryValidator')
const { validateRecipe, validateNotExistRecipeBody, validateExistRecipeBody, validateExistRecipeParams } = require('../middlewares/validators/recipeValidator')
const { validateExistUser, validateExistUserBody } = require('../middlewares/validators/userValidator')



router.get('/', recipeController.getAllRecipes)
router.get('/:recipe_name/:user_name/:user_email', recipeController.getRecipeById)
router.get('/:category', recipeController.getRecipeByCategory)
router.post('/create',verifyToken,validateRecipe,validateExistUserBody,validateExistSetOfCategories, validateNotExistRecipeBody, recipeController.addRecipe)
router.delete('/',verifyToken,validateExistRecipeBody, recipeController.deleteRecipe)
router.put('/:recipe_name/:recipe_user_name/:recipe_user_email', verifyToken,validateExistRecipeParams, recipeController.updateRecipe)


module.exports = router