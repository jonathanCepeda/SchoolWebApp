const express = require("express");
const router = express.Router();

const apiUsers = require('../controllers/users')
const auth = require('../middleware/validateToken');

router.post( '/login/', apiUsers.login);
router.post( '/logout/', auth, apiUsers.logout);
router.get( '/', auth, apiUsers.getUsers);
router.post( '/', auth, apiUsers.addUser);
router.patch( '/:userID', auth, apiUsers.editUser);
router.delete( '/:userID', auth, apiUsers.deleteUser);

module.exports = router;