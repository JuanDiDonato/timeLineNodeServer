// controladores para la tabla post

// model
const Post = require('../models/post')

const post_controllers = {}

// obtener post
post_controllers.get_posts = async (req,res) => {
    const {username} = req.params
    const posts = await Post.find({username})
    res.status(200).json({posts})
}

// crear post
post_controllers.new_post = async (req,res) => {
    const {username} = req.user
    const {title, comment} = req.body
    let file_names = []
    const files = req.files
    files.forEach(element => {
        file_names.push(element.filename)
    });
    if(title && comment){
        await Post.insertMany({username,title,comment,'file':file_names})
        res.status(201).json({error:false})
    }else{
        res.status(400).json({error:true,message:'Complete todos los datos'})
    }
}

// edit post
post_controllers.edit_post = async (req,res) => {
    const {username} = req.user
    const {post} = req.params
    const {title,comment} = req.body
    if(title === null || title === '' || comment === null || comment === ''){
        res.status(400).json({error:true,message:'Complete todos los campos'})
    }else{
        const posts = await Post.findOne({'id':post,username})
        if(!posts) res.status(400).json({error:true,message:'No se puede editar este post.'})
        else{
            const obj = {title,comment}
            await Post.findOneAndUpdate({'id':post,username},obj).then(res.status(200).json({error:false}))
        }
    }

}

// delete post
post_controllers.delete_post = async (req,res) => {
    const {username} = req.user
    const {post} = req.params
    await Post.findOneAndDelete({'id':post,username}).then(res.status(204).end())
}

module.exports = post_controllers