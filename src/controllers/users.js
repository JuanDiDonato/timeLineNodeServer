// controladores para la tabla users

// jwt
const jwt = require('jsonwebtoken')
// bcrypt
const bcrypt = require('../helpers/bcrypt')
// models
const User = require('../models/user')
const Post = require('../models/post')


const user_controllers = {}

user_controllers.signToken = id => {
    return jwt.sign({
        iss: 'test',
        sub: id
    },'test', {expiresIn: '1h'})
}

// registrar usuario
user_controllers.register = async (req, res) => {
    const {username, password} = req.body
    if(username == null || username =='' || password == null || password == ''){
        res.status(400).json({error:true,message:'Complete todos los campos.'})
    }else{
        const IsUser = await User.findOne({username: username})
        if(IsUser){
            res.status(422).json({error:true,message:'Este usuario ya existe.'})
        }else{
            const newUser = new User({username, password})
            newUser.password = await bcrypt.EncryptPassword(password)
            await newUser.save();
            res.status(201).json({error:false,message:'Usuario creado exitosamente.'})
        }
    }
}

// iniciar session
user_controllers.login = async (req, res) => {
    if(req.isAuthenticated()){
        const {id,username} = req.user
        let token = user_controllers.signToken(id)
        const user = {
            'id': id,
            'username': username
        }
        res.cookie('access_token', token, {httpOnly : true, sameSite : true})
        res.status(200).json({error:false,message:'Inicio sesion como '+username, user })
    }
}

// agregar amigos
user_controllers.add_friend = async (req,res)=>{
    const {username} = req.user
    const {friend} = req.body
    let friends_list
    if(!friend){
        res.status(400).json({error:true,message:'Este usuario no puede ser su amigo.'})
    }else{
        await User.findOne({username}).then(data => {
            friends_list = data.friends
        })
        if(friends_list.indexOf(friend) === -1){
            friends_list.push(friend)
            await User.findOneAndUpdate({username},{friends: friends_list}).then(
                res.status(200).json({'error':false})
            )
        }else{
            res.status(400).json({'error':true,message:'Este usuario ya esta en tu lista de amigos.'})
        }
    }
}

// borrar amigo
user_controllers.delete_friend = async (req,res) => {
    const {username} = req.user
    const {friend} = req.params
    let friends_list
    if(friend){
        await User.findOne({username}).then( data => {
            friends_list = data.friends
        })
        let i = friends_list.indexOf(friend)
        if( i === -1){
            res.status(400).json({error:true,message:'Este usuario no es tu amigo.'})
        }else{
            friends_list.splice(i,1)
            await User.findOneAndUpdate({username},{friends: friends_list}).then(
            res.status(200).json({error:false}))
        }
    }
}

// datos del perfil
user_controllers.set_perfil = async (req,res) => {
    const {username} = req.user
    const {description} = req.body
    const files = req.files
    if(!description){
        res.status(400).json({error:true,message:'Complete todos los campos.'})
    }else{
        let photo = null
        if(files){
            photo = files[0].filename
        }
        await User.findOneAndUpdate({username},{description,photo}).then(
            res.status(200).json({error:false})
        )
    }
}

// obtener usuarios registrados
user_controllers.get_users = async (req,res) => {
    let users_usernames = []
    const users = await User.find()
    for(let user in users){
        users_usernames.push(users[user].username)
    }
    res.status(200).json({users_usernames})
}

// obtener usuario
user_controllers.get_user = async (req,res) => {
    const {username} = req.params
    const userData = await User.findOne({username})
    const postsData = await Post.find({username})
    if(userData){
        const perfil = {
            username : userData.username,
            friends : userData.friends,
            photo: userData.photo,
            description: userData.description,
            posts : postsData
        }
        res.status(200).json({error:false,perfil})
    }else{
        res.status(400).json({error:true,message:'Ocurrio un error al cargar el perfil.'})
    }

}

// verifica al usuario logueado
user_controllers.isAuthenticated = (req,res) => {
    if(req.user){
        const {username,id,friends} = req.user
        res.status(200).json({username,id,friends,'isAuth':true})
    }else{
        res.status(204).end()
    }

}

module.exports = user_controllers