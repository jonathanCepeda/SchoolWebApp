const mongoose = require( 'mongoose' );

const studentsSchema = mongoose.Schema({
    studentID : {
        type: String,
        required: true
    },
    studentName : {
        type: String,
        required: true
    },
    groupID : {
        type: String,
        required: true
    },
    grades: [{
        subject: String, 
        grade: Number
    }],
    attendance: Number,
    contactInfo : {
        name: String,
        phone: String,
        address: String
    },
    users : [{
        userID: Number
    }]
});

const studentsCollection = mongoose.model("students", studentsSchema);

const Students = {
    get : function(){
        return studentsCollection
            .find()
            .then( students => {
                return students;
            })
            .catch( err => {
                throw Error(err);
            });
    },

    getOne : function(studentID){
        return studentsCollection
            .find({ studentID : studentID })
            .then( student => {
                return student;
            })
            .catch( err => {
                throw Error(err);
            });
    },

    post : function(newStudent){
        return studentsCollection
            .create(newStudent)
            .then( createdStudent => {
                return createdStudent;
            })
            .catch( err => {
                throw Error(err);
            });
    },

    delete : function(studentID){
        return studentsCollection
            .remove({ studentID : studentID })
            .then( deletedStudent => {
                return deletedStudent;
            })
            .catch( err => {
                throw Error(err);
            });
    },

    patch : function(studentID,studentName, groupID, grades, attendance, contactInfo, users){
        return studentsCollection
            .updateOne({ 
                studentID : studentID 
            }, {  
                $set: {
                    studentName: studentName,
                    groupID: groupID,
                    grades: grades,
                    attendance: attendance,
                    contactInfo: contactInfo,
                    users: users
                }
            })
            .then( updatedStudent => {
                return updatedStudent;
            })
            .catch( err => {
                throw Error(err);
            });
    }
};

module.exports = { Students };