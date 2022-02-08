// controladores para la tabla users

// conexion a DB
const pool = require('../database/connection')

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

user_controllers.register = async (req, res) => {
    const {username, password} = req.body
    if(username == null || username =='' || password == null || password == ''){
        res.status(400).json({error:true,message:'Complete todos los campos.'})
    }else{
        const IsUser = await pool.query('SELECT * FROM users WHERE username = ?', username)
        if(IsUser.length >= 1){
            res.status(422).json({error:true,message:'Este usuario ya existe.'})
        }else{
            const hashPassword = await bcrypt.EncryptPassword(password)
            await pool.query('INSERT INTO users SET ?', {username,'password': hashPassword})
            res.status(201).json({error:false,message:'Usuario creado exitosamente.'})
        }
    }
}

user_controllers.login = async (req, res) => {
    if(req.isAuthenticated()){
        const {id} = req.user
        token = user_controllers.signToken(id)
        res.cookie('access_token', token, {httpOnly : true, sameSite : true})
        res.status(200).json({error:false})
    }
}

module.exports = user_controllers