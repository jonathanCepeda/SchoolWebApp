const mongoose = require( 'mongoose' );

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

const groupsCollection = mongoose.model("groups", groupsSchema);

const Groups = {
    get : function(){
        return groupsCollection
            .find()
            .then( groups => {
                return groups;
            })
            .catch( err => {
                throw Error(err);
            });
    },

    getOne : function(groupID){
        return groupsCollection
            .find({ groupID : groupID })
            .then( group => {
                return group;
            })
            .catch( err => {
                throw Error(err);
            });
    },

    post : function(newGroup){
        return groupsCollection
            .create(newGroup)
            .then( createdGroup => {
                return createdGroup;
            })
            .catch( err => {
                throw Error(err);
            });
    },

    delete : function(groupID){
        return groupsCollection
            .remove({ groupID : groupID })
            .then( deletedGroup => {
                return deletedGroup;
            })
            .catch( err => {
                throw Error(err);
            });
    },

    patch : function(updateGroup){
        return groupsCollection
            .updateOne({ 
                groupID : updateGroup.groupID 
            }, {  
                $set: {
                    professorID: updateGroup.professorID,
                    studentList: updateGroup.studentList,
                    subjectList: updateGroup.subjectList
                }
            })
            .then( updatedGroup => {
                return updatedGroup;
            })
            .catch( err => {
                throw Error(err);
            });
    }
};

module.exports = { Groups };