// rutas de la tabla user

// router
const {Router} = require('express')

// passport
const passport = require('passport')
require('../passport')

// controllers
const {register,login,add_friend,get_user,delete_friend,set_perfil} = require('../controllers/users')

const router = Router()

// register user
router.post('/register',register)
// login user
router.post('/login', passport.authenticate('local',{session:false}),login)
// añadir amigo
router.post('/friends',passport.authenticate('jwt',{session:false}),add_friend)
// borrar amigos
router.delete('/friend/:friend',passport.authenticate('jwt',{session:false}),delete_friend)
// datos del perfil
router.post('/perfil',passport.authenticate('jwt',{session:false}),set_perfil)
// obtener usuario
router.get('/perfil/:username',passport.authenticate('jwt',{session:false}),get_user)


module.exports = router