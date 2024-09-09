


import  express  from "express";

const router=express.Router();
import  cursoController from "../controllers/cursosController";

router.get('/',cursoController.consultar);
router.post('/',cursoController.insertar);
router.put('/',cursoController.modificar);
router.delete('/',cursoController.borrar)


router.route('/:id')
.put(cursoController.modificar)
.delete(cursoController.borrar)
.get(cursoController.consultarUno)

router.get('/', (req,res)=>{
    res.send('Consultando curso');
});

router.post('/', (req,res)=>{
    res.send('Agregando curso');
});


router.put('/', (req,res)=>{
    res.send('Modificando curso');
});


router.delete('/', (req,res)=>{
    res.send('Borrando curso');
});


export default router;