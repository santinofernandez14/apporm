import express from 'express';
import estudiantesController from '../controllers/estudiantesController';

const router = express.Router();


router.get('/insertar', (req, res) => {
    res.render('insertarEstudiante'); 
});


router.post('/insertar', estudiantesController.insertar);


router.get('/listar', estudiantesController.listar);

router.get('/editar/:id', estudiantesController.editar);


router.put('/modificar', estudiantesController.modificar);

router.get('/eliminar/:id', estudiantesController.eliminar);

export default router;
