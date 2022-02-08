// rutas de la tabla pictures

// router
const {Router} = require('express')

// passport
const passport = require('passport')
require('../passport')

// controllers
const {new_picture,get_pictures,delete_picture} = require('../controllers/pictures')

const router = Router()

// añadir foto
router.post('/pictures', passport.authenticate('jwt',{session:false}),new_picture)

// obtener fotos
router.get('/pictures',passport.authenticate('jwt',{session:false}),get_pictures)

// borrar foto
router.delete('/picture/:id',passport.authenticate('jwt',{session:false}),delete_picture)

module.exports=router