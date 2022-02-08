// rutas de la tabla user

// router
const {Router} = require('express')

// passport
const passport = require('passport')
require('../passport')

// controllers
const {register,login} = require('../controllers/users')

const router = Router()

// register user
router.post('/register',register)
// login user
router.post('/login', passport.authenticate('local',{session:false}),login)

module.exports = router