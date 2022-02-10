// express
const express = require('express')
// morgan
const morgan = require('morgan')
// cookie parser
const cookieParser = require('cookie-parser')
// Multer
const multer = require('multer')

const path = require('path')

// mongoDB
require('./database/mongoDB')





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

    Multer(){
        const storage = multer.diskStorage({
            destination: path.join(__dirname, 'public/files'),
            filename: (req, file, cb) => {
                cb(null, new Date().getTime() + path.extname(file.originalname));
            }
        });
        this.app.use(multer({
            storage,
            fileFilter(req, file, cb) {
                cb(null, true);
            },
        }).array("files"))
    }

    Routes(){
        this.app.use('/users',require('./routes/user'))
        this.app.use('/posts',require('./routes/post'))
    }

    Start(){
        this.app.listen(this.app.get('port'),()=>{
            console.log('[+] Servidor en linea en http://localhost:'+this.app.get('port'))
        })
    }

    get init(){
        this.Middlewares()
        this.Multer()
        this.Routes()
        this.Start()
    }
}

const server = new Server()
server.init

module.exports=server