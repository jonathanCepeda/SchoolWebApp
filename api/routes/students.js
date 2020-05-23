const express = require("express");
const router = express.Router();

const apiStudents = require('../controllers/students')
const auth = require('../middleware/validateToken');

router.get( '/', auth, apiStudents.getStudents);
router.get( '/:id', auth, apiStudents.getStudent);
router.post( '/', auth, apiStudents.create.addStudent);
router.delete( '/:id', auth, apiStudents.deleteStudent);
router.patch( '/:id', auth, apiStudents.editStudent);

module.exports = router;