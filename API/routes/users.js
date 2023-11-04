var express = require('express');
const { getAllUsers, getUser, createFav, deleteFav, getFavs, createCalif, deleteCalif, getCalifs, deleteUser, updateUser, getRecipes, getOneFav, checkFav, getActualCalif, updateCalif } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authJwt');
const { validateExistRecipeBody } = require('../middlewares/validators/recipeValidator');
const { validateNotExistFav, validateExistFav, validateExistCalif, validateNotExistCalif, validateExistUserBody, validateExistUserParams, validateExistUserQuery} = require('../middlewares/validators/userValidator');

var router = express.Router();

/* GET users listing. */
router.get('/recipes',validateExistUserBody,getRecipes)
router.get('/fav',verifyToken,validateExistUserQuery,getFavs)
router.post('/fav',verifyToken,validateExistUserBody,validateExistRecipeBody,validateNotExistFav, createFav)
router.post('/haveFav',verifyToken, checkFav)//AGREGAR VERIFYTOKEN
router.delete('/fav',verifyToken,validateExistUserBody,validateExistRecipeBody,validateExistFav, deleteFav)

router.get('/calif/actualCalif',verifyToken,validateExistUserQuery,getActualCalif)
router.get('/calif',verifyToken,validateExistUserBody,getCalifs)
router.post('/calif',verifyToken,validateExistUserBody,validateExistRecipeBody,validateNotExistCalif, createCalif)
router.delete('/calif',verifyToken,validateExistUserBody,validateExistRecipeBody,validateExistCalif, deleteCalif)
router.put('/calif',verifyToken,validateExistUserBody,validateExistRecipeBody,validateExistCalif, updateCalif)

router.delete('/',verifyToken,validateExistUserBody, deleteUser)
router.put('/:user_name/:user_email',verifyToken,validateExistUserParams, updateUser)

router.get('/', getAllUsers)
router.get('/:id', getUser)

module.exports = router;
