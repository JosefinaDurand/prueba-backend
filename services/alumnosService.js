const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'josefina',
  password: 'josefina',
  database: 'basededatos',
});

function getAllAlumnos(req, res) {
  connection.query('SELECT * FROM alumnos', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener alumnos' });
    } else {
      res.status(200).json(results);
    }
  });
}

function getAlumnoById(req, res) {
  const alumnoId = req.params.id;
  connection.query('SELECT * FROM alumnos WHERE id = ?', [alumnoId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el alumno por ID' });
    } else {
      res.status(200).json(results);
    }
  });
}

function createAlumno(req, res) {
  console.log(req.body);
  const { contenido } = req.body;
  connection.query('INSERT INTO alumnos (contenido) VALUES (?)', [contenido], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el alumno' });
    } else {
      res.status(201).json({ message: 'Alumno creado correctamente', id: results.insertId });
    }
  });
}

function updateAlumno(req, res) {
  const alumnoId = req.params.id;
  const { contenido } = req.body;
  connection.query('UPDATE alumnos SET contenido = ? WHERE id = ?', [contenido, alumnoId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el alumno' });
    } else {
      res.status(200).json({ message: 'Alumno actualizado correctamente' });
    }
  });
}

function deleteAlumno(req, res) {
  const alumnoId = req.params.id;
  connection.query('DELETE FROM alumnos WHERE id = ?', [alumnoId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el alumno' });
    } else {
      res.status(200).json({ message: 'Alumno eliminado correctamente' });
    }
  });
}

function insertDatosPrueba() {
  const datosPrueba = [
    { contenido: 'Alumno 1' },
    { contenido: 'Alumno 2' },
    { contenido: 'Alumno 3' },
  ];

  datosPrueba.forEach((alumno) => {
    connection.query('INSERT INTO alumnos SET ?', alumno, (error, results) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Datos de prueba insertados correctamente.');
      }
    });
  });
}

insertDatosPrueba();

module.exports = {
  getAllAlumnos,
  getAlumnoById,
  createAlumno,
  updateAlumno,
  deleteAlumno,
};
