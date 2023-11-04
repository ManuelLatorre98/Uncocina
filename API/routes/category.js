const express = require('express')
const { addCategory, getAllCategories, getCategory, deleteCategory, updateCategory } = require('../controllers/categoryController')
const { verifyToken } = require('../middlewares/authJwt')
const { validateCategory, validateNotExistCategory, validateExistCategoryBody, validateExistCategoryParams} = require('../middlewares/validators/categoryValidator')
const router = express.Router()


router.get('/:id',validateExistCategoryBody,getCategory)
router.get('/', getAllCategories)
router.post('/create',verifyToken, validateCategory, validateNotExistCategory, addCategory)
router.delete('/',verifyToken,validateExistCategoryBody, deleteCategory)
router.put('/:category_name', verifyToken,validateExistCategoryParams, updateCategory)


module.exports = router