// controladores para la tabla pictures

// conexion a DB
const pool = require('../database/connection')

const picture_controllers = {}

// añadir una foto
picture_controllers.new_picture = async (req,res) => {
    const file = req.file
    if (file){
        file = JSON.stringify(file.filename)
        await pool.query('INSERT INTO pictures SET ?', {file})
        res.status(201).json({error:false})
    }
    res.status(400).json({error:true,message:'Complete todos los campos'})
}

// obtener fotos
picture_controllers.get_pictures = async (req,res) => {
    const {id} = req.user[0]
    const files = await pool.query('SELECET * FROM pictures WHERE user = ?', id)
    res.status(200).json({files, error:false})
}

// borrar una foto
picture_controllers.delete_picture = async (req,res)=>{
    const {id} = req.params
    if(id){
        try{
            await pool.query('DELETE FROM pictures WHERE id = ?', id)
            res.status(200).json({error:false})
        }catch{
            res.status(400).json({error:true,message:'El archivo no existe o no se puede eliminar'})
        }
    }
}

module.exports = picture_controllers