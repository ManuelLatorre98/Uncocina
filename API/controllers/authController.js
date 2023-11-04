const {createUser, getUserEmailOrName} = require('../services/userService')
const {hashPassword, comparePassword} = require('../auth/hashPassword')
const {generateToken} = require('../helpers/authHelper')

module.exports = {
  async register(req, res){
    try{
      const {user_email, user_name, password} = req.body
      const encryptedPassword = await hashPassword(password)
      const newData = {user_email, user_name, password:encryptedPassword}
      const newUser = await createUser(newData) 
      const token = generateToken(newUser)
      res.status(200).json({...newUser, token:token})
    }catch(err){
      console.log(`Register Error: ${err.message}`)
      res.status(500).json({ok:false, error: err.message})
    }
  },

  async login(req, res){
    const {user_email, password} = req.body
    const user = await getUserEmailOrName(user_email)
    const passwordMatch = await comparePassword(password, user[0].password)
    if(passwordMatch){
      const token = generateToken(user[0])
      res.status(200).json({...user[0], token: token})
    }else{
      res.status(401).json({error: 'Invalid password'})
    }
  }
}