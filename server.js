const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const uuid = require('uuid');
const mongoose = require('mongoose');
const { DATABASE_URL, PORT } = require( './config' );
const validation = require('./middleware/validateToken');

const app = express();
const jsonParser = bodyParser.json();

app.use( morgan('dev') );
app.use(validation);

app.get( '/students', (req, res) => {
	console.log("Get all ");
});

app.get( '/student', (req, res) =>{
	console.log("Get one");
});

app.post( '/student', jsonParser, (req, res) =>{
	console.log('Post one');
});

app.delete( '/student/:id', (req, res) => {
	console.log('Delete one')

});

app.patch( '/student/:id', jsonParser, (req, res) => {
	console.log('Patch one')
});

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
