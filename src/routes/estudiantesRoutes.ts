import express from 'express';
import estudiantesController from '../controllers/estudiantesController';

const router = express.Router();

// Ruta para mostrar el formulario de insertar
router.get('/insertar', (req, res) => {
    res.render('insertarEstudiante'); // Renderiza la vista de insertar
});

// Ruta para insertar
router.post('/insertar', estudiantesController.insertar);

// Ruta para listar todos los estudiantes
router.get('/listar', estudiantesController.listar);

router.get('/editar/:id', estudiantesController.editar);

// Ruta para modificar un estudiante (PUT)
router.put('/modificar', estudiantesController.modificar);
// Ruta para eliminar un estudiante
router.get('/eliminar/:id', estudiantesController.eliminar);

export default router;
