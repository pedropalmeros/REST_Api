require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config.db')


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userRoutes = '/api/users';
        this.authPath = '/api/auth'

        //Connect to DB
        this.dataBaseConnect();

        // Middlewares
        this.middlewares();

        this.routes();
    }

    dataBaseConnect(){
        dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use( cors());

        // Body lecture and parsing
        this.app.use(express.json());

        // Public sources
        this.app.use( express.static('public'));        

    }

    routes(){
        this.app.use(this.userRoutes,require('../routes/user.routes'));
        this.app.use(this.authPath,require('../routes/auth.routes'));
    }

    listenPort(){
        this.app.listen(this.port,()=>{
            console.log(`Server running on port: ${this.port}`);
        });
    }
}

module.exports = Server;