import express from 'express';
import profesoresController from '../controllers/profesoresController';

const router = express.Router();

// Ruta para mostrar el formulario de insertar
router.get('/insertar', (req, res) => {
    res.render('insertarProfesor');
});

// Ruta para insertar
router.post('/insertar', profesoresController.insertar);

// Ruta para listar todos los profesores
router.get('/listar', profesoresController.listar);

// Ruta para mostrar el formulario de editar
router.get('/editar/:id', profesoresController.editar);

// Ruta para modificar un profesor
router.put('/modificar', profesoresController.modificar);

// Ruta para eliminar un profesor
router.get('/eliminar/:id', profesoresController.eliminar);

export default router;
