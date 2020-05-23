const express = require("express");
const router = express.Router();

const apiUsers = require('../controllers/users')
const auth = require('../middleware/validateToken');

router.post( '/login/id', apiUsers.login);
router.post( '/logout/id', auth, apiUsers.logout);
router.get( '/', auth, apiUsers.getUsers);
router.post( '/', auth, apiUsers.addUser);
router.patch( '/:id', auth, apiUsers.editUser);
router.delete( '/:id', auth, apiUsers.deleteUser);

module.exports = router;