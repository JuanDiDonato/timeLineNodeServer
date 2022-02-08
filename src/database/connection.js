// conexion a la base de datos

// requisitos
const mysql = require('mysql')
const {promisify} = require('util')
const {database} = require('./keys') 

const pool = mysql.createPool(database)

// conexion
pool.getConnection((err,conecction) => {
    if(err) console.log('[-]'+err)
    if(conecction){
        console.log('[+] Base de datos conectada')
        conecction.release()
    }
})

pool.query = promisify(pool.query)

module.exports=pool