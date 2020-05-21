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

/* Your code goes here */
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

const studentsCollection = mongoose.model('students', studentsSchema);

const Students = {
	createStudent : function( newStudent ){
		return studentsCollection
				.create(newStudent)
				.then(createdStudent =>{
					return createdStudent;
				})
				.catch( err => {
					throw new Error(err);
				});
	}

}

module.exports = {
    Students
};