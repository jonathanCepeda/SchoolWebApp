const mongoose = require( 'mongoose' );

/*
Student{
    ID,
    Name,
    Group,
    Grades{
        grade,
        SubjectN
    },
    Attendance
    },
    contact:{
        name,
        phone,
        address
    }
*/

const studentsSchema =mongoose.Schema({
    studentID : {
        type: String,
        required: true
    },
    studentName : {
        type: String,
        required: true
    },
    studentGroup : {
        type: String,
        required: true
    },
    grades: [{
        subject: String, 
        grade : Number
    }],
    attendance: Number,
    contactInfo : {
        name: String,
        phone: String,
        address: String
    }
});

module.exports = mongoose.model('Students', studentsSchema);