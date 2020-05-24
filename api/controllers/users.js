const mongoose = require("mongoose");
const { Users } = require("../models/users");
const uuid = require('uuid');

// POST http://localhost:8080/users/login/ + body
exports.login = (req, res, next) => {
/*   doesnt work yet
    let username = req.body.username;
    let password = req.body.password;

	if ( !username || !password ){
        res.statusMessage = "One of the parameters is missing.";
        return res.status(406).end();
    }

    Users.getOne(username)
        .then( user => {
            if (user.length < 1) {
                return res.status(401).json({
                  message: "Auth failed"
                });
            }     
            
            if( req.body.password == user[0].password){
                let updateUser = user.tokens.append({token: "token1"});
                patch(updateUser)
                .then( updatedUser => {
                    return res.status(200).json({
                        token: updatedUser.tokens[0]
                      });
                })
                .catch( err => {
                    res.statusMessage = "Something went wrong with the DB."
                    return res.status(500).json({
                        status: 500,
                        message: "Something went wrong with the DB."
                    });
                });
            }
            else{
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
        })
        .catch( err => {
            res.statusMessage = "Something went wrong with the DB."
            return res.status(500).json({
                status: 500,
                message: "Something went wrong with the DB."
            });
        });
*/
}

// POST http://localhost:8080/users/logout/ + body
exports.logout = (req, res, next) => {

}

// GET http://localhost:8080/users/
exports.getUsers = (req, res, next) => {
    console.log("Getting all users");
    Users.get()
        .then( result =>{
            return res.status(200).json(result);
        })
        .catch( err => {
			res.statusMessage = "Something went wrong with the DB."
			return res.status(500).json({
				status: 500,
				message: "Something went wrong with the DB."
			});
		});
}

// POST http://localhost:8080/users/ + body
exports.addUser = (req, res, next) => {
    console.log("Posting a new user");

    let username = req.body.username;
    let userType = req.body.userType;
    let password = req.body.password;
    let studentID = req.body.studentID;
    let theme = req.body.theme;
    let tokens = req.body.tokens;

    if ( !username || !userType || !password || !studentID || !theme ){
        res.statusMessage = "One of the parameters is missing.";
        return res.status(406).end();
    }

    userID = uuid.v4();

    let newUser = {
        userID: userID,
        username: username, 
        userType: userType, 
        password: password,
        studentID: studentID,
        theme: theme,
        tokens: tokens
    };

	Users.post(newUser)
		.then( newUser => {
			return res.status(200).json(newUser);
		})
		.catch( err => {
			res.statusMessage = "Something went wrong with the DB."
			return res.status(500).json({
				status: 500,
				message: "Something went wrong with the DB."
			});
		});
}

// DELETE http://localhost:8080/users/:id + body
exports.deleteUser = (req, res, next) => {
    console.log("Deleting user");

    let userID = req.params.userID;

    if( !userID ){
        res.statusMessage = "The ID is missing in the parameters.";
        return res.status(406).end();
    }

    Users.getOneByID(userID)
        .then(user =>{
            if(user.length === 0){
                res.statusMessage = "User not found";
                return res.status(404).end();
            }
            else{
                Users.delete(userID)
                    .then( result =>{
                        return res.status(200).end();
                    })
                    .catch( err => {           
                        res.statusMessage = "Something went wrong with the DB."
                        return res.status(500).json({
                            status: 500,
                            message: "Something went wrong with the DB."
                        });
                    });
            }
        })
        .catch( err => {
            res.statusMessage = "Something went wrong with the DB."
            return res.status(500).json({
                status: 500,
                message: "Something went wrong with the DB."
            });
        });
}

// PATCH http://localhost:8080/users/:id + body
exports.editUser = (req, res, next) => {
    console.log("Editing user");

    let id = req.params.userID;
    let userID = req.body.userID;

    if ( !userID || !id ){
        res.statusMessage = "One of the IDs is missing.";
        return res.status(406).end();
    }

    if (id !== userID){
        res.statusMessage = "The IDs in the body and the params don't match";
        return res.status(409).end();
    }

    let username = req.body.username;
    let userType = req.body.userType;
    let password = req.body.password;
    let studentID = req.body.studentID;
    let theme = req.body.theme;
    let tokens = req.body.tokens;

    if ( !username || !userType || !password || !studentID || !theme ){
        res.statusMessage = "One of the parameters is missing.";
        return res.status(406).end();
    }

    let updateUser = {
        userID: userID,
        username: username, 
        userType: userType, 
        password: password,
        studentID: studentID,
        theme: theme,
        tokens: tokens
    };
    Users.patch(updateUser)
    .then( update => {
        return res.status(200).json(update);
    })
    .catch( err => {
        res.statusMessage = "Something went wrong with the DB."
        return res.status(500).json({
            status: 500,
            message: "Something went wrong with the DB."
        });
    });
}