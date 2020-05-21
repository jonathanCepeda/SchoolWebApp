const mongoose = require( 'mongoose' );

/*
Group{
    groupID, (example: 1A_2020)
    professorID,
    listOfStudents{
        studentID
    },
    HomeworkList{  (can add "group" to homework model and avoid this)
    Homework
    },
    ResourcesList{ (can add "group" to resources model and avoid this)
    Resources
    },
    Subjects{
    subjectName
    }
}
*/

const groupsSchema =mongoose.Schema({
    groupID : {
        type : String,
        required : true,
        unique : true
    },
    professorID: String,
    studentList : [{
        studentID : String
    }],
    subjectList : [{
        subject : String
    }]
});