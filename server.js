const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const morgan = require('morgan');
const mongoose = require('mongoose');
//const uuid = require('uuid');
//const cors = require('cors');

const { DATABASE_URL, PORT } = require( './config' );
//const validation = require('./middleware/validateToken');

const app = express();
app.use( morgan('dev') );
//app.use(cors);

/*    Routes   */

const userRoutes = require("./api/routes/users");
const studentRoutes = require("./api/routes/students");
const groupRoutes = require("./api/routes/groups");
const homeworkRoutes = require("./api/routes/homework");
const contentRoutes = require("./api/routes/content");

/*    Connecting to the DB    */

app.listen( PORT, () => {
    console.log( "This server is running" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        mongoose.disconnect();
        console.log( err );
    });
});
