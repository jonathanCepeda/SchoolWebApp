const express = require("express");
const router = express.Router();

const apiContent = require('../controllers/content')
const auth = require('../middleware/validateToken');

router.get( '/', auth, apiContent.getContent);
router.post( '/', auth, apiContent.addContent);
router.delete( '/:contentID', apiContent.deleteContent);
router.patch( '/:contentID', apiContent.editContent);

module.exports = router;