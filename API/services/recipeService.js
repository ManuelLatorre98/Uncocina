const pool= require('../config/dbConection.js')

module.exports = {
  async createRecipe(data){
    const {recipe_name,user_email, user_name, steps, imageURL, estimatedTime, difficulty, ingredients} = data;
    let {categories} = data
    categories = [].concat(categories)

    try{
      await pool.query(
        `INSERT INTO recipe (recipe_name,user_email, user_name, steps, imageURL, estimatedTime, creationDate, difficulty, ingredients)
        VALUES ('${recipe_name}','${user_email}','${user_name}','${steps}','${imageURL}',${estimatedTime},now(),'${difficulty}','${ingredients}')
        `
      )
      for (let i = 0; i < categories.length; i++) {
        await pool.query(
          `INSERT INTO belongs (recipe_name,recipe_user_email, recipe_user_name, category_name)
          VALUES ('${recipe_name}','${user_email}','${user_name}','${categories[i]}')
          `
        )
      }
      
      return data
    }catch(err){
      console.log(err)
    }
  },

  async getRecipes(from, amount,sort_by, order_by, categories, maxDiffDays){
    let sqlSelect = 'SELECT r.*, b.category_name, avgCalif '
    let sqlFrom = `FROM 
    (SELECT q.recipe_name, q.recipe_user_email, q.recipe_user_name, ROUND(AVG(calification),2) as avgCalif
    FROM recipe r INNER JOIN qualify q
    ON r.recipe_name = q.recipe_name
    AND r.user_email = q.recipe_user_email
    AND r.user_name = q.recipe_user_name 
    GROUP BY recipe_name, recipe_user_email, recipe_user_name ) as c
    RIGHT JOIN recipe r 
    ON r.recipe_name = c.recipe_name
    AND r.user_email = c.recipe_user_email
    AND r.user_name = c.recipe_user_name
    INNER JOIN belongs b 
    ON r.recipe_name = b.recipe_name
    AND r.user_email = b.recipe_user_email
    AND r.user_name = b.recipe_user_name `
    let sqlWhere=''
    let sqlLimit=''
    let sqlOrderby=''
    if(sort_by!=undefined && order_by!=undefined){
      if(sort_by!='difficulty'){
        sqlOrderby=`ORDER BY ${sort_by} ${order_by} `
      }else{
        sqlOrderby=`ORDER BY 
        CASE
          when ${sort_by} = 'Facil' then 0
          when ${sort_by} = 'Media' then 1
          when ${sort_by} = 'Dificil' then 2
        end ${order_by} `
      }
    }
    if(from!=undefined && amount!=undefined){
      sqlLimit = `LIMIT ${from},${amount} `
    }

    if(categories != undefined){//This is for search by multiple categories
      categories = [].concat(categories)
      let stringCategories = categories.map(category => `'${category}'`).toString() //Format string to search by multiple categories at same time

      sqlWhere = `WHERE b.category_name IN (${stringCategories}) `
      if(maxDiffDays!=undefined){
        sqlWhere+= `AND DATEDIFF(CURRENT_DATE(), creationDate)<=${maxDiffDays} `
      }
    }else{
      if(maxDiffDays!=undefined){
        sqlWhere = `WHERE DATEDIFF(CURRENT_DATE(), creationDate) <= ${maxDiffDays} `
      }
    }
    
    const queryStr = sqlSelect+sqlFrom+sqlWhere+sqlOrderby+sqlLimit

    const [rows] = await pool.query(queryStr)
    return rows;
  },

  async getRecipe(recipe_name, user_name, user_email){
    const [rows] = await pool.query(
      `SELECT *
      FROM recipe
      WHERE recipe_name='${recipe_name}' AND user_name='${user_name}' AND user_email='${user_email}'`
    )
    return rows;
  },

  async getRecipeByCategory(from, amount, sort_by, order_by, category){
    sqlSelect = 'SELECT r.*, b.category_name '
    sqlFrom = `FROM recipe r INNER JOIN belongs b 
    ON r.recipe_name = b.recipe_name
    AND r.user_email = b.recipe_user_email
    AND r.user_name = b.recipe_user_name `
    let sqlWhere=`WHERE category_name = '${category}' `
    let sqlLimit=''
    let sqlOrderby=''
    if(sort_by!=undefined && order_by!=undefined){
      sqlOrderby=`ORDER BY ${sort_by} ${order_by} `
    }
    
    if(from!=undefined && amount!=undefined){
      sqlLimit = `LIMIT ${from},${amount} `
    }
    const queryStr = sqlSelect+sqlFrom+sqlWhere+sqlOrderby+sqlLimit
    const [rows] = await pool.query(queryStr)
    return rows;
  },

  async deleteRecipe(recipe_name, user_name, user_email){
    await pool.query(
      `DELETE FROM recipe
      WHERE recipe_name='${recipe_name}' AND user_email='${user_email}' AND user_name='${user_name}'
      `
    )
  },

  async updateRecipe(dataId, data){
    const {recipe_name,user_email, user_name, steps, imageURL, estimatedTime, difficulty, ingredients} = data;
    let {categories} = data
    categories = [].concat(categories)
    try{
      await pool.query(
        `UPDATE recipe
        SET recipe_name='${recipe_name}', user_email='${user_email}', user_name='${user_name}', steps='${steps}', imageURL= '${imageURL}', estimatedTime= ${estimatedTime},difficulty='${difficulty}', ingredients='${ingredients}'
        WHERE recipe_name='${dataId.recipe_name}' AND user_email='${dataId.recipe_user_email}' AND user_name='${dataId.recipe_user_name}'
        `
      )

      await pool.query(
        `DELETE FROM belongs 
        WHERE recipe_name = '${recipe_name}' AND recipe_user_email = '${user_email}' AND recipe_user_name = '${user_name}'
        `
      )
       for (let i = 0; i < categories.length; i++) {
        await pool.query(
          `INSERT IGNORE INTO belongs (recipe_name,recipe_user_email, recipe_user_name, category_name)
          VALUES ('${recipe_name}','${user_email}','${user_name}','${categories[i]}')
          `
        ) 
      }
      return data
    }catch(err){
      if(err.errno == 1062){//This manage the duplicate keys on update
        throw "New recipe name already exist for user in data base"
      }else{
        console.log(err)
      }
    }
  },
}