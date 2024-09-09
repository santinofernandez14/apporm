import  express  from "express";

const router=express.Router();
import  estudianteController from "../controllers/estudiantesController";
router.get('/',estudianteController.consultar);
router.post('/',estudianteController.insertar);
router.put('/',estudianteController.modificar);
router.delete('/',estudianteController.borrar)

router.route('/:id')
.put(estudianteController.modificar)
.delete(estudianteController.borrar)
.get(estudianteController.consultarUno)


export default router;