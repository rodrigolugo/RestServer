
const express = require('express')
const cors = require('cors')

class Server{

    

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.routePath = '/api/usuarios';
        //Middlewares
        this.middlewares();
        this.routes();
    }

    middlewares(){
        //CORS
        this.app.use(cors());        
        this.app.use( express.json() )
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.routePath , require('../routes/usuarios'))
    }

    listen(){
        this.app.listen( this.port, () =>{
            console.log('Servidor corriendo en el puerto: ' + this.port);
        })
    }
}
module.exports = Server;
