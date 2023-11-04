const express = require('express');
const router = express.Router();
const recipesRouter = require('./recipe')
const authRouter = require('./auth')
const categoryRouter = require('./category')
const userRouter = require('./users')
/* GET home page. */
router.get('/', async function(req, res, next) {
  res.json({
    message: 'API Uncocina',
    alumno: "Manuel Latorre",
    legajo: "FAI-1931",
  })
});
router.use('/auth', authRouter)
router.use('/category',categoryRouter)
router.use('/recipe', recipesRouter)
router.use('/user', userRouter)



module.exports = router;
