// parametros de conexion a la base de datos

module.exports={
    database : {
        connectionLimit: 30, //cantidad de conexiones simultaneas
        host: 'localhost', //host de la base de datos
        user:'root',   //user de la base de datos
        password:'', 
        database:'timeLineServer' //base de datos que uso en mysql y gestiono en phpmyadmin
    } 
}