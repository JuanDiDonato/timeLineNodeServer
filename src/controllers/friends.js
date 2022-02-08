// controladores para la tabla friends

// conexion a DB
const pool = require('../database/connection')

const friends_controllers = {}

// añadir un amigo
friends_controllers.add_friend = async (req,res)=>{
    const {id} = req.user[0]
    const {friend} = req.body
    if(friend){
        const my_friend = await pool.query('SELECT * FROM friends WHERE user = ? AND friend = ?', [id,friend])
        if(my_friend.length > 0){
            res.status(400).json({'error':true,message:'Este usuario ya esta en tu lista de amigos'})
        }else{
            try{
                await pool.query('INSERT INTO friends SET ?',{'user':id,friend})
                res.status(200).json({error:false})
            }catch{
                res.status(400).json({error:true,message:'Este usuario no existe.'})
            }
           
        }
    }
}


// obtener amigos
friends_controllers.get_friends = async (req,res) => {
    const {id} = req.user[0]
    const friends = await pool.query('SELECT * FROM friends WHERE user = ?',id)
    res.status(200).json({friends})
}

// borrar amigo
friends_controllers.delete_friend = async (req,res) => {
    const {id} = req.user[0]
    const {friend} = req.params
    if(friend){
        const my_friend = await pool.query('SELECT * FROM friends WHERE user = ? AND friend = ?', [id,friend])
        if(my_friend.length === 0){
            res.status(400).json({'error':true,message:'Este usuario no es tu amigo'})
        }else{
            await pool.query('DELETE FROM friends WHERE user = ? AND friend = ?',[id,friend])
            res.status(200).json({error:false})
        }
    }
}

module.exports=friends_controllers