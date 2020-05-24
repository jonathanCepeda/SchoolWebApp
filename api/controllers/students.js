const mongoose = require("mongoose");
const { Students } = require("../models/students");
const uuid = require('uuid');

// GET http://localhost:8080/students/
exports.getStudents = (req, res, next) => {
    console.log("Getting all students");
    Students.get()
        .then( result =>{
            return res.status(200).json(result);
        })
        .catch( err => {
            res.statusMessage = "Something went wrong with the DB."
            return res.status(500).end();
        });
}

// GET http://localhost:8080/students/:id
exports.getStudent = (req, res, next) => {
    console.log("Getting a student");

    let studentID = req.params.studentID;

    Students.getOne(studentID)
        .then( result =>{
            if(!result){
                res.statusMessage = "Student not found.";
                return res.status(404).end();
            }
            else{
                return res.status(200).json(result);
            }
        })
        .catch( err => {
            res.statusMessage = "Something went wrong with the DB."
            return res.status(500).end();
        });
}

// POST http://localhost:8080/students/ + body
exports.addStudent = (req, res, next) => {
    console.log("Posting a new student");

    let studentName = req.body.studentName;
    let groupID = req.body.groupID;
    let grades = req.body.grades;
    let attendance = req.body.attendance;
    let contactInfo = req.body.contactInfo;
    let users = req.body.users;

    if ( !studentName || !groupID || !grades || (attendance == null) || !contactInfo || !users ){
        res.statusMessage = "One of the parameters is missing.";
        return res.status(406).end();
    }

    studentID = uuid.v4();

    let newStudent = {
        studentID: studentID,
        studentName: studentName,
        groupID: groupID, 
        grades: grades, 
        attendance: attendance,
        contactInfo: contactInfo,
        users: users
    };

    Students.post(newStudent)
        .then( result => {
            return res.status(200).json(result);
        })
        .catch( err => {
            res.statusMessage = "Something went wrong with the DB."
            return res.status(500).end();
        });
}

// DELETE http://localhost:8080/students/:id
exports.deleteStudent = (req, res, next) => {
    console.log("Deleting student");

    let studentID = req.params.studentID;

    if( !studentID ){
        res.statusMessage = "The ID is missing in the parameters.";
        return res.status(406).end();
    }

    Students.getOne(studentID)
        .then(student =>{
            if(student.length === 0){
                res.statusMessage = "Student not found";
                return res.status(404).end();
            }
            else{
                Students.delete(studentID)
                    .then( result =>{
                        return res.status(200).end();
                    })
                    .catch( err => {           
                        res.statusMessage = "Something went wrong with the DB."
                        return res.status(500).end();
                    });
            }
        })
        .catch( err => {
            res.statusMessage = "Something went wrong with the DB."
            return res.status(500).end();
        });
}

// PATCH http://localhost:8080/students/:id + body
exports.editStudent = (req, res, next) => {
    console.log("Editing student");

    let id = req.params.studentID;
    let studentID = req.body.studentID;

    if ( !studentID || !id ){
        res.statusMessage = "One of the IDs is missing.";
        return res.status(406).end();
    }

    if (id !== studentID){
        res.statusMessage = "The IDs in the body and the params don't match";
        return res.status(409).end();
    }

    let studentName = req.body.studentName;
    let groupID = req.body.groupID;
    let grades = req.body.grades;
    let attendance = req.body.attendance;
    let contactInfo = req.body.contactInfo;
    let users = req.body.users;

    if ( !studentName || !groupID || !grades || (attendance == null) || !contactInfo || !users ){
        res.statusMessage = "One of the parameters is missing.";
        return res.status(406).end();
    }

    let updateStudent = {
        studentID: studentID,
        studentName: studentName,
        groupID: groupID, 
        grades: grades, 
        attendance: attendance,
        contactInfo: contactInfo,
        users: users
    };

    Students.getOne(studentID)
    .then(student =>{
        if(student.length === 0){
            res.statusMessage = "Student not found";
            return res.status(404).end();
        }
        else{
            Students.patch(updateStudent)
                .then( update => {
                    return res.status(200).json(update);
                })
                .catch( err => {
                    res.statusMessage = "Something went wrong with the DB."
                    return res.status(500).end();
                });
        }
    })
    .catch( err => {
        res.statusMessage = "Something went wrong with the DB."
        return res.status(500).end();
    });
}
