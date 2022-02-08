// creacion de la base de datos
const mysql = require('mysql')

class DataBase{
    constructor(){
        this.pool = mysql.createPool({
            host: '127.0.0.1', //host de la base de datos
            user:'root',   //user de la base de datos
            password:'', 
        })
    }

    Connection(){
        this.pool.getConnection((err,conecction) => {
            if(err) console.log('[-]'+err)
            if(conecction){
                console.log('[+] Base de datos conectada')
                this.pool.query('USE timeLineServer')
                this.CreateUsers()
                this.CreateFriends()
                this.CreatePictures()
                this.CreatePost()
                this.FriendsUsers()
                this.PicturesUsers()
                this.PostUsers()
                conecction.release()
            }
            
        })
    }
    CreateBase(){
        this.pool.query('CREATE DATABASE timeLineServer CHARACTER SET utf8')
        console.log('[+] Base de datos creada')
        this.pool['config']['connectionConfig']['database'] = 'timeLineServer'
    }
    CreateUsers(){
        console.log('Creando tabla users...')
        this.pool.query('CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) UNIQUE, password VARCHAR(255))')
        console.log('Creada.')
    }
    CreateFriends(){
        console.log('Creando tabla friends...')
        this.pool.query('CREATE TABLE IF NOT EXISTS friends (id INT AUTO_INCREMENT PRIMARY KEY, user INT(10), friend INT(10))')
        console.log('Creada.')
    }
    CreatePictures(){
        console.log('Creando tabla pictures...')
        this.pool.query('CREATE TABLE IF NOT EXISTS pictures (id INT AUTO_INCREMENT PRIMARY KEY, file VARCHAR(255), user INT(10))')
        console.log('Creada.')
    }
    CreatePost(){
        console.log('Creando tabla post...')
        this.pool.query('CREATE TABLE IF NOT EXISTS post (id INT AUTO_INCREMENT PRIMARY KEY, file VARCHAR(255), user VARCHAR(255), title VARCHAR(255), description VARCHAR(255))')
        console.log('Creada.')
    }
    FriendsUsers(){
        this.pool.query('ALTER TABLE friends ADD FOREIGN KEY (friend) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE; ')
        this.pool.query('ALTER TABLE friends ADD FOREIGN KEY (user) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE; ')
    }
    PicturesUsers(){
        this.pool.query('ALTER TABLE pictures ADD FOREIGN KEY (user) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE; ')
    }
    PostUsers(){
        this.pool.query('ALTER TABLE post ADD FOREIGN KEY (user) REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE; ')
    }
}

const timeLineServer = new DataBase()
timeLineServer.CreateBase()
setTimeout(() => timeLineServer.Connection(),10)
setTimeout(() => process.exit(),1000)


