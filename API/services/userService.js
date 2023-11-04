const pool= require('../config/dbConection.js')
async function recalculateCalif(recipe_name, recipe_user_email, recipe_user_name, user_email, user_name){
  const [rows] = await pool.query(
    `
    SELECT ROUND(AVG(calification),2) as avgCalif
    FROM recipe r INNER JOIN qualify q
    ON r.recipe_name = q.recipe_name
    AND r.user_email = q.recipe_user_email
    AND r.user_name = q.recipe_user_name 
    WHERE q.recipe_name='${recipe_name}' AND q.recipe_user_email='${recipe_user_email}' AND q.recipe_user_name='${recipe_user_name}' 
    GROUP BY q.recipe_name, q.recipe_user_email, q.recipe_user_name
    `
  )
  return rows[0].avgCalif
}
module.exports = {
  async createUser(data){
    const {user_email, user_name, password} = data;
    await pool.query(
      `INSERT INTO user (user_email, user_name, password) 
      VALUES ('${user_email}', '${user_name}', '${password}');`
    )
    return {user_email, user_name}
  },

  async getUser(user_email, user_name){
    
    const [rows] = await pool.query(
      `SELECT user_email, user_name, password
      FROM user
      WHERE user_email='${user_email}' AND user_name='${user_name}'`
    )
    return rows
  },

  async updateUser(dataId, data){
    const {user_email, user_name} = data
    try{
      await pool.query(
        `UPDATE user
        SET user_email='${user_email}', user_name='${user_name}'
        WHERE user_email='${dataId.user_email}' AND user_name='${dataId.user_name}'
        `
      )
      return data
    }catch(err){
      if(err.errno == 1062){//This manage the duplicate keys on update
        throw "New user already exist in data base"
      }else{
        console.log(err)
      }
    }
  },

  async getUserEmailOrName(user_email, user_name){//For searches with only one of the two keys
    const [rows] = await pool.query(
      `SELECT user_email, user_name, password
      FROM user
      WHERE user_email='${user_email}' OR user_name='${user_name}'`
    )

    return rows
  },
  async getUserById(id){//For searches with only one of the two keys
    const [rows] = await pool.query(
      `SELECT user_email, user_name, password
      FROM user
      WHERE user_email='${id}' OR user_name='${id}'`
    )
    return rows
  },
  async getUsers(from, amount, sort_by, order_by){
    sqlSelect = 'SELECT * '
    sqlFrom = 'FROM user '
    let sqlWhere=''
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
  async createFav(recipe_name, recipe_user_email, recipe_user_name, user_email, user_name){
    await pool.query(
      `INSERT INTO havefav (recipe_name, recipe_user_email, recipe_user_name, user_email, user_name)
      VALUES ('${recipe_name}','${recipe_user_email}','${recipe_user_name}','${user_email}','${user_name}')
      `
    )
    
    return {recipe_name, recipe_user_email, recipe_user_name, user_email, user_name}
  },

  async deleteUser(user_email, user_name){
    await pool.query(
      `DELETE FROM user
      WHERE user_email='${user_email}' AND user_name='${user_name}'
      `
    )
  }, 
  async getFav(recipe_name, recipe_user_email, recipe_user_name, user_email, user_name){
    const [rows]=await pool.query(
      `SELECT *
      FROM havefav
      WHERE recipe_name='${recipe_name}' AND recipe_user_email='${recipe_user_email}' AND recipe_user_name='${recipe_user_name}' AND user_email='${user_email}' AND user_name='${user_name}'
      `
    )
    return rows;
  },

  async getFavs(user_email, user_name, from, amount,sort_by, order_by, categories, maxDiffDays){
    sqlSelect = 'SELECT r.*, b.category_name, avgCalif '
    sqlFrom = `FROM 
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
    AND r.user_name = b.recipe_user_name
    INNER JOIN haveFav h
    ON r.recipe_name = h.recipe_name
    AND r.user_email = h.recipe_user_email
    AND r.user_name = h.recipe_user_name `
    let sqlWhere=`WHERE h.user_email='${user_email}' AND h.user_name='${user_name}' `
    let sqlLimit=''
    let sqlOrderby=''
    if(sort_by!=undefined && order_by!=undefined){
      sqlOrderby=`ORDER BY ${sort_by} ${order_by} `
    }
    
    if(from!=undefined && amount!=undefined){
      sqlLimit = `LIMIT ${from},${amount} `
    }

    if(categories != undefined){//This is for search by multiple categories
      categories = [].concat(categories)
      let stringCategories = categories.map(category => `'${category}'`).toString() //Format string to search by multiple categories at same time

      sqlWhere += `AND b.category_name IN (${stringCategories}) `
      if(maxDiffDays!=undefined){
        sqlWhere+= `AND DATEDIFF(CURRENT_DATE(), creationDate)<=${maxDiffDays} `
      }
    }else{
      if(maxDiffDays!=undefined){
        sqlWhere += `AND DATEDIFF(CURRENT_DATE(), creationDate) <= ${maxDiffDays} `
      }
    }
    const queryStr = sqlSelect+sqlFrom+sqlWhere+sqlOrderby+sqlLimit
    const [rows] = await pool.query(queryStr)
    return rows;
  },

  async removeFav(recipe_name, recipe_user_email, recipe_user_name, user_email, user_name){
    const [rows]=await pool.query(
      `DELETE FROM havefav
      WHERE recipe_name='${recipe_name}' AND recipe_user_email='${recipe_user_email}' AND recipe_user_name='${recipe_user_name}' AND user_email='${user_email}' AND user_name='${user_name}'
      `
    )
    return rows;
  },

  async createCalif(recipe_name, recipe_user_email, recipe_user_name, user_email, user_name, calif){
    await pool.query(
      `INSERT INTO qualify (recipe_name, recipe_user_email, recipe_user_name, user_email, user_name, calification)
      VALUES ('${recipe_name}','${recipe_user_email}','${recipe_user_name}','${user_email}','${user_name}', ${calif})
      `
    )
    avgCalif = await recalculateCalif(recipe_name, recipe_user_email, recipe_user_name, user_email, user_name)
    return {recipe_name, recipe_user_email, recipe_user_name, user_email, user_name,avgCalif}
  },
  
  async updateCalif(recipe_name, recipe_user_email, recipe_user_name, user_email, user_name, calif){
    const [rows]=await pool.query(
      `UPDATE qualify
      SET calification='${calif}'
      WHERE recipe_name='${recipe_name}' AND recipe_user_email='${recipe_user_email}' AND recipe_user_name='${recipe_user_name}' AND user_email='${user_email}' AND user_name='${user_name}'
      `
    )
    avgCalif = await recalculateCalif(recipe_name, recipe_user_email, recipe_user_name, user_email, user_name)
    return {recipe_name, recipe_user_email, recipe_user_name, user_email, user_name,avgCalif}
  },
  async getCalif(recipe_name, recipe_user_email, recipe_user_name, user_email, user_name){
    const [rows]=await pool.query(
      `SELECT *
      FROM qualify
      WHERE recipe_name='${recipe_name}' AND recipe_user_email='${recipe_user_email}' AND recipe_user_name='${recipe_user_name}' AND user_email='${user_email}' AND user_name='${user_name}'
      `
    )
    return rows;
  },

  async getCalifs(user_email, user_name, from, amount,sort_by, order_by){
    sqlSelect = 'SELECT * '
    sqlFrom = 'FROM qualify '
    let sqlWhere=`WHERE user_email='${user_email}' AND user_name='${user_name}'`
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
  async getActualCalif(recipe_name, recipe_user_email, recipe_user_name, user_email, user_name){
    const [rows]= await pool.query(
    `SELECT calification
     FROM qualify
     WHERE recipe_name='${recipe_name}' AND recipe_user_email='${recipe_user_email}' AND recipe_user_name='${recipe_user_name}' AND user_email='${user_email}' AND user_name='${user_name}'`)
    return rows
  },

  async removeCalif(recipe_name, recipe_user_email, recipe_user_name, user_email, user_name){
    const [rows]=await pool.query(
      `DELETE FROM qualify
      WHERE recipe_name='${recipe_name}' AND recipe_user_email='${recipe_user_email}' AND recipe_user_name='${recipe_user_name}' AND user_email='${user_email}' AND user_name='${user_name}'
      `
    )
    return rows;
  },

  async getRecipes(user_email, user_name, from, amount,sort_by, order_by){
    sqlSelect = 'SELECT u.user_email, u.user_email, r.*'
    sqlFrom = 'FROM user u NATURAL JOIN recipe r '
    let sqlWhere=`WHERE user_email='${user_email}' AND user_name='${user_name}'`
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
}