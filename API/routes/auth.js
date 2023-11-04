const express = require('express')
const router = express.Router()
const {validateLogon, validateExistUserEmailOrNameBody, validateNotExistUserBody} = require('../middlewares/validators/userValidator')
const {register, login} = require('../controllers/authController')

router.post('/register',validateLogon, validateNotExistUserBody, register)
router.post('/login', validateExistUserEmailOrNameBody, login)
module.exports = router