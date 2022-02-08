// express
const express = require('express')
// morgan
const morgan = require('morgan')
// cookie parser
const cookieParser = require('cookie-parser')



// clase server
class Server{
    constructor(){
        this.app = express()
    }

    Middlewares(){
        this.app.set('port',5000)
        this.app.use(express.json())
        this.app.use(morgan('dev'))
        this.app.use(cookieParser())
    }

    Routes(){
        this.app.use('/users',require('./routes/user'))
        this.app.use('/storage',require('./routes/picture'))
        this.app.use('/friends',require('./routes/friend'))
        this.app.use('/posts',require('./routes/post'))
    }


    Start(){
        this.app.listen(this.app.get('port'),()=>{
            console.log('[+] Servidor en linea en http://localhost:'+this.app.get('port'))
        })
    }

    get init(){
        this.Middlewares()
        this.Routes()
        this.Start()
    }
}

const server = new Server()
server.init