const express = require("express");
const router = express.Router();

const apiStudents = require('../controllers/students')
const auth = require('../middleware/validateToken');

router.get( '/', auth, apiStudents.getStudents);
router.get( '/:studentID', auth, apiStudents.getStudent);
router.post( '/', auth, apiStudents.addStudent);
router.delete( '/:studentID', auth, apiStudents.deleteStudent);
router.patch( '/:studentID', auth, apiStudents.editStudent);

module.exports = router;