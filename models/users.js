const mongoose = require( 'mongoose' );


/*
user{
    ID,
    Type, (Student, Parent, Professor, Principal)
    Username,
    Password,
    StudentID,
    theme
}
*/

let userSchema = mongoose.Schema({
	userID: {
        type: String,
        required : true
    },   
    username : {
        type: String,
        required : true,
        unique : true
    },
	userType : {
        type: String,
        required : true
    },
	password : {
        type: String,
        required : true
    },
	studentID : {
        type: String,
        required : true
    }
});