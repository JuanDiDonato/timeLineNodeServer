// rutas de la tabla friends

// router
const {Router} = require('express')

// passport
const passport = require('passport')
require('../passport')

// controllers
const {add_friend,get_friends,delete_friend} = require('../controllers/friends')

const router = Router()

// añadir amigo
router.post('/friends',passport.authenticate('jwt',{session:false}),add_friend)

// obtener amigos
router.get('/friends',passport.authenticate('jwt',{session:false}),get_friends)

// borrar amigos
router.delete('/friend/:friend',passport.authenticate('jwt',{session:false}),delete_friend)

module.exports=router