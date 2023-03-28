
const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../database/confing')
class Server{

    

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.routePath = '/api/usuarios';
        this.authPath = '/api/auth'
        this.conectarDB();
        //Middlewares
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());        
        this.app.use( express.json() )
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.authPath , require('../routes/auth'))
        this.app.use(this.routePath , require('../routes/usuarios'))
    }

    listen(){
        this.app.listen( this.port, () =>{
            console.log('Servidor corriendo en el puerto: ' + this.port);
        })
    }
}
module.exports = Server;