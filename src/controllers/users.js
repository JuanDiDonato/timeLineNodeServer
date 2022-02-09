// controladores para la tabla users

// models
const User = require('../models/user')

// jwt
const jwt = require('jsonwebtoken')

// bcrypt
const bcrypt = require('../helpers/bcrypt')

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
        res.cookie('access_token', token, {httpOnly : true, sameSite : true})
        res.status(200).json({error:false,message:'Inicio sesion como '+username})
    }
}

// agregar amigos
user_controllers.add_friend = async (req,res)=>{
    const {username} = req.user
    const {friend} = req.body
    let friends_list 
    if(friend !== '' || friend !== null){
        await User.findOne({username}).then( data => {
            friends_list = data.friends
        })
        if(friends_list.indexOf(friend) === -1){
            friends_list.push(friend)
            await User.findOneAndUpdate({username},{friends: friends_list}).then(
            res.status(200).json({error:false}))
        }else{
            res.status(400).json({'error':true,message:'Este usuario ya esta en tu lista de amigos'})
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
            res.status(400).json({'error':true,message:'Este usuario no es tu amigo'})
        }else{
            friends_list.splice(i,1)
            await User.findOneAndUpdate({username},{friends: friends_list}).then(
            res.status(200).json({error:false}))
        }
    }
}

// obtener usuario
user_controllers.get_user = async (req,res) => {
    const {username} = req.user
    const data = await User.findOne({username})
    const user = {
        username : data.username,
        friends : data.friends
    }
    res.status(200).json(user)
}

module.exports = user_controllers