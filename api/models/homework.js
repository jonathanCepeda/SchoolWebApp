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

    getOne : function(homeworkID){
        return homeworkCollection
            .find({ homeworkID : homeworkID })
            .then( homework => {
                return homework;
            })
            .catch( err => {
                throw Error(err);
            });
    },

    post : function(newHomework){
        return homeworkCollection
            .create(newHomework)
            .then( createdHomework => {
                return createdHomework;
            })
            .catch( err => {
                throw Error(err);
            });
    },

    delete : function(homeworkID){
        return homeworkCollection
            .remove({ homeworkID : homeworkID })
            .then( deletedHomework => {
                return deletedHomework;
            })
            .catch( err => {
                throw Error(err);
            });
    },

    patch : function(updateHW){
        return homeworkCollection
            .updateOne({ 
                homeworkID : updateHW.homeworkID 
            }, {  
                $set: {
                    groupID: updateHW.groupID,
                    title: updateHW.title,
                    text: updateHW.text,
                    imageURL: updateHW.imageURL,
                    subject: updateHW.subject,
                    deliveryDate: updateHW.deliveryDate,
                    homeworkDelivery: updateHW.homeworkDelivery
                }
            })
            .then( updatedHw => {
                return updatedHw;
            })
            .catch( err => {
                throw Error(err);
            });
    }
};

module.exports = { Homework };
