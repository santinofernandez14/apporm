import { Router } from "express";
import InscripcionesController from "../controllers/inscripcionesController";

const router = Router();

router.get('/listar', InscripcionesController.listar);
router.get('/insertar', (req, res) => res.render('insertarInscripcion'));
router.post('/insertar', InscripcionesController.insertar);
router.get('/editar/:curso_id/:estudiante_id', InscripcionesController.editar);
router.put('/modificar/:curso_id/:estudiante_id', InscripcionesController.modificar);
router.post('/eliminar/:curso_id/:estudiante_id', InscripcionesController.eliminar); 



export default router;

