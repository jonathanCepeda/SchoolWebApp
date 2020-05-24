const mongoose = require( 'mongoose' );

let userSchema = mongoose.Schema({
	userID: {
        type: String,
        required : true,
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

    getOne : function(username){
        return usersCollection
            .find({ username : username })
            .then( user => {
                return user;
            })
            .catch( err => {
                throw Error(err);
            });
    },

    getOneByID : function(userID){
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

    patch : function(updateUser){
        return usersCollection
            .updateOne({ 
                userID : updateUser.userID 
            }, {  
                $set: {
                    username: updateUser.username,
                    userType: updateUser.userType,
                    password: updateUser.password,
                    studentID: updateUser.studentID,
                    theme: updateUser.theme,
                    tokens: updateUser.tokens
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