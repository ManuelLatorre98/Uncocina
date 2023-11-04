const {check} = require('express-validator')
const {validateResult} = require('../../helpers/validateHelper')
const { getCategory } = require('../../services/categoryService')

const validateCategory=[
  check('category_name')
    .exists()
    .not().
    isEmpty(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

const validateExistCategoryParams = async(req, res, next) => {
  const category_name = req.params.category_name
  console.log(category_name)
  const category_rows = await getCategory(category_name)
  
  if(category_rows.length>0){//If the category does exist already
    next()
  }else{//If the category doesn't exist already
    res.status(409).json({error: "Category not exist in data base"})
  }
}

const validateExistCategoryBody = async(req, res, next) => {
  const category_name = req.body.category_name
  const category_rows = await getCategory(category_name)
  
  if(category_rows.length>0){//If the category does exist already
    next()
  }else{//If the category doesn't exist already
    res.status(409).json({error: "Category not exist in data base"})
  }
}

const validateNotExistCategory = async(req, res, next) => {
  const {category_name} = req.body
  const category_rows = await getCategory(category_name)
  if(category_rows.length===0){//If the category doesn't exist already
    next()
  }else{//If the category does exist already
    res.status(409).json({error: "Category already exist in data base"})
  }
}

const validateExistSetOfCategories = async (req, res, next) => {
  
  let {categories} = req.body //Array of category names
  categories = [].concat(categories)
  let arrayNotExist=[]
  for (let i = 0; i < categories.length; i++) {
    const rowsCategory = await getCategory(categories[i])
    if(rowsCategory.length===0){
      arrayNotExist.push(categories[i])
    }
  }

  if(arrayNotExist.length===1){
    res.status(409).json({error: `Category ${arrayNotExist} not exist in data base`})
  }else if(arrayNotExist.length>1){
    res.status(409).json({error: `Categories [${arrayNotExist}] not exist in data base`})
  }else{
    next()
  }
  
}

module.exports = {
  validateCategory,
  validateExistCategoryParams,
  validateExistCategoryBody,
  validateNotExistCategory,
  validateExistSetOfCategories
}