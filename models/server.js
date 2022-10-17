require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config.db')


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            user:       '/api/users',
            auth:       '/api/auth',
            categories: '/api/categories'
        }

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
        this.app.use(this.paths.user,require('../routes/user.routes'));
        this.app.use(this.paths.auth,require('../routes/auth.routes'));
        this.app.use(this.paths.categories,require('../routes/category.routes'))
    }

    listenPort(){
        this.app.listen(this.port,()=>{
            console.log(`Server running on port: ${this.port}`);
        });
    }
}

module.exports = Server;