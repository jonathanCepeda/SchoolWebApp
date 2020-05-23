const express = require("express");
const router = express.Router();

const apiGroups = require('../controllers/groups')
const auth = require('../middleware/validateToken');

router.get( '/:id', auth, apiGroups.getGroup);
router.post( '/', auth, apiGroups.addGroup);
router.delete( '/:id', auth, apiGroups.deleteGroup); //only for development
router.patch( '/:id', auth, apiGroups.editGroup);

module.exports = router;