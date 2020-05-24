const mongoose = require( 'mongoose' );

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
	studentID : String,
    theme : String,
    tokens :  [{
        token : String
    }]
});

const usersCollection = mongoose.model("users", userSchema);

const Users = {
    get : function(){
        return usersCollection
            .find()
            .then( users => {
                return users;
            })
            .catch( err => {
                throw Error(err);
            });
    },

    getOne : function(userID){
        return usersCollection
            .find({ userID : userID })
            .then( user => {
                return user;
            })
            .catch( err => {
                throw Error(err);
            });
    },

    post : function(newUser){
        return usersCollection
            .create(newUser)
            .then( createdUser => {
                return createdUser;
            })
            .catch( err => {
                throw Error(err);
            });
    },

    delete : function(userID){
        return usersCollection
            .remove({ userID : userID })
            .then( deletedUser => {
                return deletedUser;
            })
            .catch( err => {
                throw Error(err);
            });
    },

    patch : function(userID,username, userType, password, studentID, theme, tokens){
        return usersCollection
            .updateOne({ 
                userID : userID 
            }, {  
                $set: {
                    username: username,
                    userType: userType,
                    password: password,
                    studentID: studentID,
                    theme: theme,
                    tokens: tokens
                }
            })
            .then( updatedUser => {
                return updatedUser;
            })
            .catch( err => {
                throw Error(err);
            });
    }
};

module.exports = { Users };