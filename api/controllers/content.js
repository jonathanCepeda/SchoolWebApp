const mongoose = require("mongoose");
const { Contents } = require("../models/content");

// GET http://localhost:8080/content/
exports.getContent = (req, res, next) => {
    console.log("Getting all content");
    Contents.get()
        .then( result =>{
            return res.status(200).json(result);
        })
        .catch( err => {
            res.statusMessage = "Something went wrong with the DB."
            return res.status(500).end();
        });
}

// POST http://localhost:8080/content/ + body
exports.addContent = (req, res, next) => {
    console.log("Getting content");

    let contentID = req.params.contentID;

    Contents.getOne(contentID)
        .then( result =>{
            if(!result){
                res.statusMessage = "Content not found.";
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

// DELETE http://localhost:8080/content/:contentID
exports.deleteContent = (req, res, next) => {
    console.log("Posting new content");

    let targetGroup = req.body.targetGroup;
    let title = req.body.title;
    let text = req.body.text;
    let imageURL = req.body.imageURL;
    let videoURL = req.body.videoURL;

    if ( !targetGroup || !title ){
        res.statusMessage = "One of the parameters is missing.";
        return res.status(406).end();
    }

    contentID = uuid.v4();

    let newContent = {
        contentID: contentID,
        targetGroup: targetGroup,
        title: title, 
        text: text, 
        imageURL: imageURL,
        videoURL: videoURL
    };

    Contents.post(newContent)
        .then( result => {
            return res.status(200).json(result);
        })
        .catch( err => {
            res.statusMessage = "Something went wrong with the DB."
            return res.status(500).end();
        });
}

// PATCH http://localhost:8080/content/:contentID + body
exports.editContent = (req, res, next) => {
    console.log("Editing coontent");

    let id = req.params.contentID;
    let contentID = req.body.contentID;

    if ( !contentID || !id ){
        res.statusMessage = "One of the IDs is missing.";
        return res.status(406).end();
    }

    if (id !== contentID){
        res.statusMessage = "The IDs in the body and the params don't match";
        return res.status(409).end();
    }

    let targetGroup = req.body.targetGroup;
    let title = req.body.title;
    let text = req.body.text;
    let imageURL = req.body.imageURL;
    let videoURL = req.body.videoURL;

    if ( !targetGroup || !title ){
        res.statusMessage = "One of the parameters is missing.";
        return res.status(406).end();
    }

    let newContent = {
        contentID: contentID,
        targetGroup: targetGroup,
        title: title, 
        text: text, 
        imageURL: imageURL,
        videoURL: videoURL
    };

    Contents.getOne(contentID)
    .then(content =>{
        if(content.length === 0){
            res.statusMessage = "Content not found";
            return res.status(404).end();
        }
        else{
            Contents.patch(updateContent)
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