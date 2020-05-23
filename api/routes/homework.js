const express = require("express");
const router = express.Router();

const apiHomework = require('../controllers/homework')
const auth = require('../middleware/validateToken');

router.get( '/', auth, apiHomework.getAllHw);
router.get( '/:id', auth, apiHomework.getHW);
router.post( '/', auth, apiHomework.addHw);
router.delete( '/:id', auth, apiHomework.deleteHw);
router.patch( '/:id', auth, apiHomework.editHw);

module.exports = router;