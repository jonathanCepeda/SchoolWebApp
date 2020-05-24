const mongoose = require("mongoose");
const { Groups } = require("../models/groups");

// GET http://localhost:8080/groups/:id
exports.getGroup = (req, res, next) => {
    console.log("Getting a group");

    let groupID = req.params.groupID;

    Groups.getOne(groupID)
        .then( result =>{
            if(!result){
                res.statusMessage = "Group not found.";
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

// POST http://localhost:8080/groups/ + body
exports.addGroup = (req, res, next) => {
    console.log("Posting a new group");

    let professorID = req.body.professorID;
    let studentList = req.body.studentList;
    let subjectList = req.body.subjectList;

    if ( !professorID || !studentList || !subjectList ){
        res.statusMessage = "One of the parameters is missing.";
        return res.status(406).end();
    }

    groupID = uuid.v4();

    let newGroup = {
        groupID: groupID,
        professorID: professorID,
        subjectList: subjectList, 
        subjectList: subjectList
    };

    Groups.post(newGroup)
        .then( result => {
            return res.status(200).json(result);
        })
        .catch( err => {
            res.statusMessage = "Something went wrong with the DB."
            return res.status(500).end();
        });
}

// DELETE http://localhost:8080/groups/:id
exports.deleteGroup = (req, res, next) => {
    console.log("Deleting group");

    let groupID = req.params.groupID;

    if( !groupID ){
        res.statusMessage = "The ID is missing in the parameters.";
        return res.status(406).end();
    }

    Groups.getOne(groupID)
        .then(group =>{
            if(group.length === 0){
                res.statusMessage = "Group not found";
                return res.status(404).end();
            }
            else{
                Groups.delete(groupID)
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

// PATCH http://localhost:8080/groups/:id + body
exports.editGroup = (req, res, next) => {
    console.log("Editing group");

    let id = req.params.groupID;
    let groupID = req.body.groupID;

    if ( !groupID || !id ){
        res.statusMessage = "One of the IDs is missing.";
        return res.status(406).end();
    }

    if (id !== groupID){
        res.statusMessage = "The IDs in the body and the params don't match";
        return res.status(409).end();
    }

    let professorID = req.body.professorID;
    let studentList = req.body.studentList;
    let subjectList = req.body.subjectList;

    if ( !professorID || !studentList || !subjectList ){
        res.statusMessage = "One of the parameters is missing.";
        return res.status(406).end();
    }

    let updateGroup = {
        groupID: groupID,
        professorID: professorID,
        subjectList: subjectList, 
        subjectList: subjectList
    };

    Groups.getOne(groupID)
    .then(group =>{
        if(group.length === 0){
            res.statusMessage = "Group not found";
            return res.status(404).end();
        }
        else{
            Groups.patch(updateGroup)
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

