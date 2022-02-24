// modelo de usuario en MongoDB

const {Schema, model } = require('mongoose');
const bcrypt = require('../helpers/bcrypt')

const UserSchema= new Schema({
    username: {type:String, required: true, unique: true},
    fullname: {type:String, required: true},
    password: {type:String, required: true},
    photo: {type:String, required:false},
    description: {type:String, required:false},
    friends: {type:Array, required: false}
},
{timestamps:true});


module.exports = model('User',UserSchema);