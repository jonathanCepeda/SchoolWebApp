const mongoose = require( 'mongoose' );

const homeworksSchema =mongoose.Schema({
    homeworkID : {
        type : String,
        required : true,
        unique : true
    },
    groupID : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    text: String,
    imageURL: String,
    subject: String,
    deliveryDate: String,
    homeworkDelivery : [{
        studentID : String,
        homeworkURL : String,
        grade : Number,
    }]
});

const homeworkCollection = mongoose.model("homework", homeworksSchema);

const Homework = {
    get : function(){
        return homeworkCollection
            .find()
            .then( homeworks => {
                return homeworks;
            })
            .catch( err => {
                throw Error(err);
            });
    },

    getOne : function(userID){
        return homeworkCollection
            .find({ userID : userID })
            .then( user => {
                return user;
            })
            .catch( err => {
                throw Error(err);
            });
    },

    post : function(newUser){
        return homeworkCollection
            .create(newUser)
            .then( createdUser => {
                return createdUser;
            })
            .catch( err => {
                throw Error(err);
            });
    },

    delete : function(userID){
        return homeworkCollection
            .remove({ userID : userID })
            .then( deletedUser => {
                return deletedUser;
            })
            .catch( err => {
                throw Error(err);
            });
    },

    patch : function(userID,username, userType, password, studentID, theme, tokens){
        return homeworkCollection
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

module.exports = { Homework };