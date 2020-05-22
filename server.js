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


/*    Students    */

app.get( '/students', (req, res) => {
	console.log("Get all students");
});

app.get( '/student', (req, res) =>{
	console.log("Get one student by ID");
});

app.post( '/student', jsonParser, (req, res) =>{
	console.log('Post a new student');
});

app.delete( '/student/:id', (req, res) => {
	console.log('Delete one student by ID');

});

app.patch( '/student/:id', jsonParser, (req, res) => {
    console.log('Patch one student by ID');
    //all fields will be sent over a fetch call, no need to validate
});


/*    Users   */

app.get( '/user', (req, res) =>{
	console.log("Get one user by ID");
});

app.post( '/user', jsonParser, (req, res) =>{
	console.log('Post a new user');
});

app.delete( '/user/:id', (req, res) => {
	console.log('Delete one user by ID');
});

app.patch( '/user/:id', jsonParser, (req, res) => {
    console.log('Patch one user by ID');
    // all fields will be sent over a fetch call, no need to validate
});


/*    Groups    */

app.get( '/group', (req, res) =>{
	console.log("Get one group by ID");
});

app.post( '/group', jsonParser, (req, res) =>{
	console.log('Post a new group');
});

app.delete( '/group/:id', (req, res) => {
    console.log('Delete one group by ID');
    // only for development, it shouldn't be needed for release
});

app.patch( '/user/:id', jsonParser, (req, res) => {
    console.log('Patch one group by ID');
    // all fields will be sent over a fetch call, no need to validate
});


/*    Homework    */

app.get( '/homeworks', (req, res) => {
	console.log("Get all homework");
});

app.get( '/homework', (req, res) =>{
	console.log("Get one homework by ID");
});

app.post( '/homework', jsonParser, (req, res) =>{
	console.log('Post a new homework');
});

app.delete( '/homework/:id', (req, res) => {
    console.log('Delete one homework by ID');
});

app.patch( '/homework/:id', jsonParser, (req, res) => {
    console.log('Patch one homework by ID');
    // all fields will be sent over a fetch call, no need to validate
});


/*    Announcements    */

app.get( '/announcements', (req, res) => {
	console.log("Get all announcements");
});

app.get( '/announcement', (req, res) =>{
	console.log("Get one announcement by ID");
});

app.post( '/announcement', jsonParser, (req, res) =>{
	console.log('Post a new announcement');
});

app.delete( '/announcement/:id', (req, res) => {
    console.log('Delete one announcement by ID');
});

app.patch( '/announcement/:id', jsonParser, (req, res) => {
    console.log('Patch one announcement by ID');
    // all fields will be sent over a fetch call, no need to validate
});


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
