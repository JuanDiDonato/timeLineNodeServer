// rutas de la tabla user

// router
const {Router} = require('express')

// passport
const passport = require('passport')
require('../passport')

// controllers
const {register,login,add_friend,get_user,delete_friend} = require('../controllers/users')

const router = Router()

// register user
router.post('/register',register)
// login user
router.post('/login', passport.authenticate('local',{session:false}),login)
// añadir amigo
router.post('/friends',passport.authenticate('jwt',{session:false}),add_friend)
// obtener usuario
router.get('/user',passport.authenticate('jwt',{session:false}),get_user)
// borrar amigos
router.delete('/friend/:friend',passport.authenticate('jwt',{session:false}),delete_friend)


module.exports = router