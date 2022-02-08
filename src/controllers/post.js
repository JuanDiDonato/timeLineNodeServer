// controladores para la tabla post

// conexion a DB
const pool = require('../database/connection')

const post_controllers = {}

// obtener post
post_controllers.get_posts = async (req,res) => {
    const {username} = req.params
    const posts = await pool.query('SELECT * FROM post WHERE user = ?',username)
    res.status(200).json({posts})
}

// crear post
post_controllers.new_post = async (req,res) => {
    const {username} = req.user[0]
    const {title, description} = req.body
    const file = req.files
    if(title && description){
        await pool.query('INSERT INTO post SET ?', {'user':username,title,description,file})
        res.status(201).json({error:false})
    }else{
        res.status(400).json({error:true,message:'Complete todos los datos'})
    }
}

// edit post
post_controllers.edit_post = async (req,res) => {
    const {id} = req.user[0]
    const {post} = req.params
    const {title,description} = req.body
    if(title === null || title === '' || description === null || description === ''){
        res.status(400).json({error:true,message:'Complete todos los campos'})
    }else{
        const posts = await pool.query('SELECT * FROM post WHERE user = ? AND id = ?', [id,post])
        if(posts.length === 0) res.status(400).json({error:true,message:'No se puede editar este post.'})
        else{
            const obj = {title,description}
            await pool.query('UPDATE post SET ? WHERE id = ? ', [obj, post])
            res.status(200).json({error:false})
            
        }
    }

}

// delete post
post_controllers.delete_post = async (req,res) => {
    const {id} = req.user[0]
    const {post} = req.params
    const posts = await pool.query('SELECT * FROM post WHERE user = ? AND id = ?', [id,post])
    if(posts.length === 0) res.status(400).json({error:true,message:'No se puede borrar el post'})
    else{
        await pool.query('DELETE FROM post WHERE id = ?',post)
        res.status(200).json({error:false})
    }
}

module.exports = post_controllers