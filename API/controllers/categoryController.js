const { createCategory, getCategories, getCategory, deleteCategory, updateCategory } = require("../services/categoryService");

module.exports = {
  async addCategory(req, res){
    try{
      const {category_name} = req.body;
      const newCategory = await createCategory(category_name);
      res.status(200).json(newCategory)
    }catch(err){
      console.log(`AddCategory Error: ${err.message}`)
      res.status(500).json({ok:false, error: err.message})
    }
  },

  async getAllCategories(req, res, next){
    try{
      const {from, amount} = req.query
      const categoryRows = await getCategories(from,amount)
      res.status(200).json(categoryRows)
    }catch(err){
      next(err)
    }
  },

  async getCategory(req, res, next){
    
    try{
      const {id} = req.params
      const categoryRows = await getCategory(id)
      res.status(200).json(categoryRows)
    }catch(err){
      next(err)
    }
  },

  async deleteCategory(req, res, next){
    const {category_name} = req.body
    await deleteCategory(category_name)
    res.status(200).json({message: "Category remove success"})
  },

  async updateCategory(req, res, next){
    try{
      const dataId = req.params
      const data = req.body
      await updateCategory(dataId,data)
      res.status(200).json({message: "Category updated"}) 
    }catch(err){
      res.status(409).json({Error: err})
    }
  }
}