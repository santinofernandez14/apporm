import express from 'express';
import cursosController from '../controllers/cursosController';
import methodOverride from 'method-override';

const router = express.Router();


router.use(methodOverride('_method'));


router.get('/listar', cursosController.listar);


router.get('/insertar', (req, res) => {
    res.render('insertarCurso'); 
});


router.post('/insertar', cursosController.insertar);


router.get('/editar/:id', cursosController.editar);


router.put('/editar/:id', cursosController.modificar);


router.get('/eliminar/:id', cursosController.eliminar);



export default router;
