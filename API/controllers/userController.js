const { getUser, getUsers, getUserEmailOrName, getUserById, createFav, removeFav, getFavs, removeCalif, createCalif, getCalifs, deleteUser, updateUser, getRecipes, getFav, getActualCalif, updateCalif } = require("../services/userService")

module.exports = {
  async getUser(req,res,next){
    const {id} = req.params
    const userRows = await getUserById(id)
    if(userRows.length>0){//If the user does exist already
      res.status(200).json(userRows)
    }else{//If the user doesn't exist already
      res.status(409).json({error: "User not exist in data base"})
    }
  },

  async getAllUsers(req, res, next){
    try{
      const {from, amount, sort_by, order_by} = req.query
      const userRows = await getUsers(from, amount, sort_by, order_by)
      res.status(200).json(userRows)
    }catch(err){
      next(err)
    }
  },

  async updateUser(req, res, next){
    try{
      const dataId = req.params
      const data = req.body
      const newRecipe= await updateUser(dataId,data)
      res.status(200).json(newRecipe) 
    }catch(err){
      res.status(409).json({Error: err})
    }
  },

  async deleteUser(req, res, next){
    try{
      const {user_email, user_name} = req.body
      await deleteUser(user_email, user_name)
      res.status(200).json({message: "User remove success"})
    }catch(err){
      next(err)
    }
  },

  async getFavs(req, res, next){
    try{
      const {user_email, user_name,from, amount,sort_by, order_by, categories, maxDiffDays} = req.query
      const rowsFav = await getFavs(user_email, user_name, from, amount,sort_by, order_by, categories)
      res.status(200).json(rowsFav)
    }catch(err){
      next(err)
    }
  },
  async checkFav(req, res, next){
    try{
      const {user_email, user_name,recipe_name, recipe_user_email, recipe_user_name} = req.body
      rowsFav= await getFav(recipe_name, recipe_user_email, recipe_user_name, user_email, user_name)
      res.status(200).json(rowsFav.length>0)
    }catch(err){
      next(err)
    }
  },

  async createFav(req, res, next){
    try{
      const {recipe_name, recipe_user_email, recipe_user_name, user_email, user_name} = req.body
      const newFav = await createFav(recipe_name, recipe_user_email, recipe_user_name, user_email, user_name)
      res.status(200).json(newFav)
    }catch(err){
      next(err)
    }
  },
  async deleteFav(req, res, next){
    try{
      const {recipe_name, recipe_user_email, recipe_user_name, user_email, user_name} = req.body
      await removeFav(recipe_name, recipe_user_email, recipe_user_name, user_email, user_name)
      res.status(200).json({message: "Fav remove success"})
    }catch(err){
      next(err)
    }
  },
  async getCalifs(req, res, next){
    try{
      const {user_email, user_name,from, amount,sort_by, order_by} = req.body
      const rowsFav = await getCalifs(user_email, user_name, from, amount,sort_by, order_by)
      res.status(200).json(rowsFav)
    }catch(err){
      next(err)
    }
  },
  async getActualCalif(req, res, next){
    try{
      const {recipe_name, recipe_user_email, recipe_user_name, user_email, user_name} = req.query
      const [rowsActualCalif] = await getActualCalif(recipe_name, recipe_user_email, recipe_user_name, user_email, user_name)
      res.status(200).json(rowsActualCalif)
    }catch(err){

      next(err)
    }
  },
  async createCalif(req, res, next){
    try{
      const {recipe_name, recipe_user_email, recipe_user_name, user_email, user_name, calif} = req.body
      const newCalif = await createCalif(recipe_name, recipe_user_email, recipe_user_name, user_email, user_name, calif)
      res.status(200).json(newCalif)
    }catch(err){
      console.log(err)
      next(err)
    }
  },
  async updateCalif(req, res, next){
    try{
      const {recipe_name, recipe_user_email, recipe_user_name, user_email, user_name, calif} = req.body
      const newCalif = await updateCalif(recipe_name, recipe_user_email, recipe_user_name, user_email, user_name, calif)
      res.status(200).json(newCalif)
    }catch(err){
      console.log(err)
      next(err)
    }
  },
  async deleteCalif(req, res, next){
    try{
      const {recipe_name, recipe_user_email, recipe_user_name, user_email, user_name} = req.body
      await removeCalif(recipe_name, recipe_user_email, recipe_user_name, user_email, user_name)
      res.status(200).json({message: "Calification remove success"})
    }catch(err){
      next(err)
    }
  },

  async getRecipes(req, res, next){
    try{
      const {user_email, user_name,from, amount,sort_by, order_by} = req.body
      const rowsRecipes = await getRecipes(user_email, user_name, from, amount,sort_by, order_by)
      res.status(200).json(rowsRecipes)
    }catch(err){
      next(err)
    }
  },
}