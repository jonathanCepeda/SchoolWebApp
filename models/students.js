const mongoose = require( 'mongoose' );


/*
Student{
    ID,
    Type, (Student, Parent, Professor, Principal)
    Username,
    Password,
    Group,
    Grades{
    gradeSubjectN
    },
    Attendance
    }
*/

/* Your code goes here */
const studentsSchema =mongoose.Schema({
	name : {
		type : String,
		required : true
	},
	num_players : {
		type : Number,
		required : true
	},
	id : {
		type : Number,
		required : true,
		unique : true
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