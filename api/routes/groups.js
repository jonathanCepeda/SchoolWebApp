const express = require("express");
const router = express.Router();

const apiGroups = require('../controllers/groups')
const auth = require('../middleware/validateToken');

router.get( '/:groupID', auth, apiGroups.getGroup);
router.post( '/', auth, apiGroups.addGroup);
router.delete( '/:groupID', auth, apiGroups.deleteGroup); //only for development
router.patch( '/:groupID', auth, apiGroups.editGroup);

module.exports = router;