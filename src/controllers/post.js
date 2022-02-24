// controladores para la tabla post

// model
const Post = require('../models/post')

const post_controllers = {}

// obtener post
post_controllers.get_posts = async (req,res) => {
    const {username} = req.params
    const posts = await Post.find({username})
    res.status(200).json(posts.reverse())
}

// crear post
post_controllers.new_post = async (req,res) => {
    const {username} = req.user
    const {title, comment} = req.body
    const files = req.files
    let file_names = []
    if(title && comment){
        if(files){
            files.forEach(element => {
                file_names.push(element.filename)
            });
        }
        await Post.insertMany({username,title,comment,'file':file_names})
        res.status(201).json({error:false})
    }else{
        res.status(400).json({error:true,message:'Complete todos los datos.'})
    }
}

// edit post
post_controllers.edit_post = async (req,res) => {
    const {username} = req.user
    const {post} = req.params
    const {title,comment} = req.body
    if(!title || !comment){
        res.status(400).json({error:true,message:'Complete todos los datos.'})
    }else{
        const posts = await Post.findOne({'_id':post,username})
        if(!posts) res.status(403).json({error:true,message:'No se puede editar este post.'})
        else{
            const obj = {title,comment}
            await Post.findOneAndUpdate({'_id':post,username},obj).then(res.status(200).json({error:false}))
        }
    }

}

// delete post

// simpre retorna un 204, pero si el post a borrar no pertenece al usuario logueado, no borra nada.

post_controllers.delete_post = async (req,res) => {
    const {username} = req.user
    const {post} = req.params
    const postToDelete = await Post.findOneAndDelete({'_id':post,username})
    if(postToDelete){
       res.status(204).end()
    }
    else res.status(403).json({error:true,message:'No se puede borrar este post.'})
    
}

module.exports = post_controllers