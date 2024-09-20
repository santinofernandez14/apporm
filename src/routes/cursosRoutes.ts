import express from 'express';
import cursosController from '../controllers/cursosController';
import methodOverride from 'method-override';

const router = express.Router();

// Configura method-override para usar _method en formularios HTML
router.use(methodOverride('_method'));

// Ruta para listar los cursos
router.get('/listar', cursosController.listar);

// Ruta para mostrar el formulario de insertar
router.get('/insertar', (req, res) => {
    res.render('insertarCurso'); // Renderiza la vista de insertar curso
});

// Ruta para insertar curso
router.post('/insertar', cursosController.insertar);

// Ruta para editar curso
router.get('/editar/:id', cursosController.editar);

// Ruta para procesar la edición del curso (PUT)
router.put('/editar/:id', cursosController.modificar);

// Ruta para eliminar curso (DELETE)
router.get('/eliminar/:id', cursosController.eliminar);



export default router;
