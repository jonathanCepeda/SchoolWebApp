const mongoose = require( 'mongoose' );


/*
Homework{
    homeworkID,
    groupID,
    title,
    text,
    imageURL, (optional)
    subject, (validation in front end)
    HomeworkDelivery{
        studentID,
        HomeworkURL,
        grade
    }
}
*/ 

const homeworksSchema =mongoose.Schema({
    homeworkID : {
        type : String,
        required : true,
        unique : true
    },
    groupID: String,
    title: String,
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

module.exports = mongoose.model('Homeworks', homeworksSchema);