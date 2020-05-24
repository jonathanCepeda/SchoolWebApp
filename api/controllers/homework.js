const mongoose = require("mongoose");
const { Homework } = require("../models/homework");

// GET http://localhost:8080/homework/
exports.getAllHw = (req, res, next) => {
    console.log("Getting all homework");
    Homework.get()
        .then( result =>{
            return res.status(200).json(result);
        })
        .catch( err => {
			res.statusMessage = "Something went wrong with the DB."
			return res.status(500).end();
		});
}

// GET http://localhost:8080/homework/:id
exports.getHW = (req, res, next) => {
    console.log("Getting a homework");

    let homeworkID = req.params.homeworkID;

    Homework.getOne(homeworkID)
        .then( result =>{
            if(!result){
                res.statusMessage = "Homework not found.";
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

// POST http://localhost:8080/homework/ + body
exports.addHw = (req, res, next) => {
    console.log("Posting a new homework");

    let groupID = req.body.groupID;
    let title = req.body.title;
    let text = req.body.text;
    let imageURL = req.body.imageURL;
    let subject = req.body.subject;
    let deliveryDate = req.body.deliveryDate;
    let homeworkDelivery = req.body.homeworkDelivery;

    if ( !groupID || !title || !subject || deliveryDate || !homeworkDelivery ){
        res.statusMessage = "One of the parameters is missing.";
        return res.status(406).end();
    }

    homeworkID = uuid.v4();

    let newHomework = {
        homeworkID: homeworkID,
        groupID: groupID,
        title: title, 
        text: text, 
        imageURL: imageURL,
        subject: subject,
        deliveryDate: deliveryDate,
        homeworkDelivery: homeworkDelivery
    };

	Homework.post(newHomework)
		.then( result => {
			return res.status(200).json(result);
		})
		.catch( err => {
			res.statusMessage = "Something went wrong with the DB."
			return res.status(500).end();
		});
}

// DELETE http://localhost:8080/homework/:id
exports.deleteHw = (req, res, next) => {
    console.log("Deleting homework");

    let homeworkID = req.params.homeworkID;

    if( !homeworkID ){
        res.statusMessage = "The ID is missing in the parameters.";
        return res.status(406).end();
    }

    Homework.getOne(homeworkID)
        .then(homework =>{
            if(homework.length === 0){
                res.statusMessage = "Homework not found";
                return res.status(404).end();
            }
            else{
                Homework.delete(homeworkID)
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

// PATCH http://localhost:8080/homework/:id + Body
exports.editHw = (req, res, next) => {
    console.log("Editing homework");

    let id = req.params.homeworkID;
    let homeworkID = req.body.homeworkID;

    if ( !homeworkID || !id ){
        res.statusMessage = "One of the IDs is missing.";
        return res.status(406).end();
    }

    if (id !== homeworkID){
        res.statusMessage = "The IDs in the body and the params don't match";
        return res.status(409).end();
    }

    let groupID = req.body.groupID;
    let title = req.body.title;
    let text = req.body.text;
    let imageURL = req.body.imageURL;
    let subject = req.body.subject;
    let deliveryDate = req.body.deliveryDate;
    let homeworkDelivery = req.body.homeworkDelivery;

    if ( !groupID || !title || !subject || deliveryDate || !homeworkDelivery ){
        res.statusMessage = "One of the parameters is missing.";
        return res.status(406).end();
    }

    let updateHomework = {
        homeworkID: homeworkID,
        groupID: groupID,
        title: title, 
        text: text, 
        imageURL: imageURL,
        subject: subject,
        deliveryDate: deliveryDate,
        homeworkDelivery: homeworkDelivery
    };

    Homework.getOne(homeworkID)
    .then(homework =>{
        if(homework.length === 0){
            res.statusMessage = "Homework not found";
            return res.status(404).end();
        }
        else{
            Homework.patch(updateHomework)
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
