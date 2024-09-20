import express from 'express';
import profesoresController from '../controllers/profesoresController';

const router = express.Router();


router.get('/insertar', (req, res) => {
    res.render('insertarProfesor');
});


router.post('/insertar', profesoresController.insertar);


router.get('/listar', profesoresController.listar);


router.get('/editar/:id', profesoresController.editar);


router.put('/modificar', profesoresController.modificar);


router.get('/eliminar/:id', profesoresController.eliminar);

export default router;
