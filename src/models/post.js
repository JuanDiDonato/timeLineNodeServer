// modelo de posts

const {Schema, model } = require('mongoose');

const PostSchema= new Schema({
    title: {type:String, required:true},
    comment: {type:String, required:false},
    username: {type:String, required:true},
    file: {type:Array, required:false}
},
{timestamps:true});


module.exports = model('Post',PostSchema);