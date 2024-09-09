import { Router } from "express";
import inscripcionesController from "../controllers/inscripcionController";

const router = Router();

// Rutas para gestionar inscripciones
router.post('/', inscripcionesController.insertar); // Insertar una inscripción
router.get('/', inscripcionesController.consultarTodos); // Consultar todas las inscripciones
router.get('/curso/:curso_id', inscripcionesController.consultarXCurso); // Consultar inscripciones por curso
router.get('/estudiante/:estudiante_id', inscripcionesController.consultarXEstudiante); // Consultar inscripciones por estudiante
router.put('/:curso_id/:estudiante_id', inscripcionesController.modificar); // Modificar inscripción
router.delete('/:curso_id/:estudiante_id', inscripcionesController.borrar); // Borrar inscripción

export default router;
