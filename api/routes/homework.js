const express = require("express");
const router = express.Router();

const apiHomework = require('../controllers/homework')
const auth = require('../middleware/validateToken');

router.get( '/', auth, apiHomework.getAllHw);
router.get( '/:homeworkID', auth, apiHomework.getHW);
router.post( '/', auth, apiHomework.addHw);
router.delete( '/:homeworkID', auth, apiHomework.deleteHw);
router.patch( '/:homeworkID', auth, apiHomework.editHw);

module.exports = router;