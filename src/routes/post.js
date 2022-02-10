// rutas de la tabla post

// router
const {Router} = require('express')

// passport
const passport = require('passport')
require('../passport')

// controllers
const {new_post,get_posts,edit_post,delete_post} = require('../controllers/post')

const router = Router()

// obtener posts
router.get('/posts/:username',get_posts)
// crear post
router.post('/post', passport.authenticate('jwt',{session:false}),new_post)
// editar post
router.put('/post/:post', passport.authenticate('jwt',{session:false}),edit_post)
// borrar post
router.delete('/post/:post', passport.authenticate('jwt',{session:false}),delete_post)

module.exports= router
