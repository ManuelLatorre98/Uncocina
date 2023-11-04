const { createRecipe, getRecipes, getRecipe, deleteRecipe, updateRecipe, getRecipeByCategory } = require("../services/recipeService")

module.exports ={
  async getAllRecipes(req, res, next){
    try{
      const {from, amount,sort_by, order_by, categories, maxDiffDays, } = req.query
      const recipeRows= await getRecipes(from, amount,sort_by, order_by, categories, maxDiffDays,)
      res.status(200).json(recipeRows)
    }catch(err){
      console.log(err)
      next(err)
    }
  },

  async getRecipeById(req, res, next){
    const {recipe_name, user_name, user_email} = req.params
    const row = await getRecipe(recipe_name, user_name, user_email)
    if(row.length>0){
      res.status(200).json(row)
    }else{
      res.status(409).json({error: "Recipe not exist in data base"})
    }
  },

  async getRecipeByCategory(req, res, next){
    const {category} = req.params
    const {from, amount, sort_by, order_by} = req.query
    const row = await getRecipeByCategory(from, amount, sort_by, order_by,category)
    res.status(200).json(row)
   
  },

  async addRecipe(req, res, next){
    try{
      const data = req.body
      const newRecipe= await createRecipe(data)
      res.status(200).json(newRecipe) 
    }catch(err){
      next(err)
    }
  },

  async deleteRecipe(req, res, next){
    const {recipe_name, recipe_user_name, recipe_user_email} = req.body
    await deleteRecipe(recipe_name, recipe_user_name, recipe_user_email)
    res.status(200).json({message: "Recipe remove success"})
  },

  async updateRecipe(req, res, next){
    try{
      const dataId = req.params
      const data = req.body
      const newRecipe= await updateRecipe(dataId,data)
      res.status(200).json(newRecipe) 
    }catch(err){
      res.status(409).json({Error: err})
    }
  }
}