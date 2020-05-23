const express = require("express");
const router = express.Router();

const apiContent = require('../controllers/content')
const auth = require('../middleware/validateToken');

app.get( '/', auth, apiContent.getContent);
app.post( '/', auth, apiContent.addContent);
app.delete( '/:id', apiContent.deleteContent);
app.patch( '/:id', apiContent.editContent);

module.exports = router;