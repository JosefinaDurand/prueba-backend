const express = require('express');
const router = express.Router();
const alumnosService = require('../services/alumnosService');

router.get('/', alumnosService.getAllAlumnos);

router.get('/:id', alumnosService.getAlumnoById);

router.post('/', alumnosService.createAlumno);

router.put('/:id', alumnosService.updateAlumno);

router.delete('/:id', alumnosService.deleteAlumno);

module.exports = router;
