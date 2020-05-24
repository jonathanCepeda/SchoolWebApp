const express = require("express");
const router = express.Router();

const apiContent = require('../controllers/content')
const auth = require('../middleware/validateToken');

router.get( '/', auth, apiContent.getContent);
router.post( '/', auth, apiContent.addContent);
router.delete( '/:id', apiContent.deleteContent);
router.patch( '/:id', apiContent.editContent);

module.exports = router;