import { Request, Response } from "express";
import { Inscripcion } from "../models/inscripcionesModel";
import { Curso } from "../models/cursoModel";
import { Estudiante } from "../models/estudianteModel";

class InscripcionesController {

    async insertar(req: Request, res: Response) {
        const { curso_id, estudiante_id, nota } = req.body;
        try {
           
            const curso = await Curso.findOneBy({ id: Number(curso_id) });
            const estudiante = await Estudiante.findOneBy({ id: Number(estudiante_id) });
    
            if (!curso) {
                return res.status(404).json({ mensaje: 'Curso no encontrado' });
            }
            if (!estudiante) {
                return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
            }
    
          
            const nuevaInscripcion = Inscripcion.create({
                curso_id: curso.id,
                estudiante_id: estudiante.id,
                curso,
                estudiante,
                nota
            });
    
           
            const inscripcion = await Inscripcion.save(nuevaInscripcion);
            res.status(201).json(inscripcion);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async consultarTodos(req: Request, res: Response) {
        try {
            const inscripciones = await Inscripcion.find({
                relations: ['curso', 'estudiante']  
            });
    
            
            const data = inscripciones.map(inscripcion => ({
                curso_id: inscripcion.curso_id,
                estudiante_id: inscripcion.estudiante_id,
                nota: inscripcion.nota
            }));
    
            res.status(200).json(data);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
    
    async consultarXEstudiante(req: Request, res: Response) {
        const { estudiante_id } = req.params;
        try {
            const inscripciones = await Inscripcion.find({
                where: { estudiante_id: Number(estudiante_id) }, 
                relations: ['curso', 'estudiante']  
            });
    
            if (!inscripciones.length) {
                return res.status(404).json({ mensaje: 'No se encontraron inscripciones para este estudiante' });
            }
    
           
            const data = inscripciones.map(inscripcion => ({
                curso_id: inscripcion.curso_id,
                estudiante_id: inscripcion.estudiante_id,
                nota: inscripcion.nota
            }));
    
            res.status(200).json(data);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
    async consultarXCurso(req: Request, res: Response) {
        const { curso_id } = req.params;
        try {
            const inscripciones = await Inscripcion.find({
                where: { curso_id: Number(curso_id) },  
                relations: ['curso', 'estudiante']  
            });
    
            if (!inscripciones.length) {
                return res.status(404).json({ mensaje: 'No se encontraron inscripciones para este curso' });
            }
    
            
            const data = inscripciones.map(inscripcion => ({
                curso_id: inscripcion.curso_id,
                estudiante_id: inscripcion.estudiante_id,
                nota: inscripcion.nota
            }));
    
            res.status(200).json(data);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async modificar(req: Request, res: Response) {
        const { curso_id, estudiante_id } = req.params;  
        const { nuevo_curso_id, nuevo_estudiante_id, nota } = req.body;  
    
        try {
          
            const inscripcion = await Inscripcion.findOne({
                where: {
                    curso_id: Number(curso_id),
                    estudiante_id: Number(estudiante_id)
                }
            });
    
            if (!inscripcion) {
                return res.status(404).json({ mensaje: 'Inscripción no encontrada' });
            }
    
         
            const nuevoCurso = await Curso.findOneBy({ id: Number(nuevo_curso_id) });
            const nuevoEstudiante = await Estudiante.findOneBy({ id: Number(nuevo_estudiante_id) });
    
            if (!nuevoCurso) {
                return res.status(404).json({ mensaje: 'Nuevo curso no encontrado' });
            }
    
            if (!nuevoEstudiante) {
                return res.status(404).json({ mensaje: 'Nuevo estudiante no encontrado' });
            }
    
           
            await Inscripcion.remove(inscripcion);
    
           
            const nuevaInscripcion = Inscripcion.create({
                curso_id: nuevoCurso.id,
                estudiante_id: nuevoEstudiante.id,
                nota: nota
            });
    
           
            await Inscripcion.save(nuevaInscripcion);
    
            res.status(200).json({ mensaje: 'Inscripción modificada exitosamente', nuevaInscripcion });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
    
    
    async borrar(req: Request, res: Response) {
        const { curso_id, estudiante_id } = req.params;  
    
        try {
            
            const inscripcion = await Inscripcion.findOne({
                where: {
                    curso_id: Number(curso_id),
                    estudiante_id: Number(estudiante_id)
                }
            });
    
            if (!inscripcion) {
                return res.status(404).json({ mensaje: 'Inscripción no encontrada' });
            }
    
           
            await Inscripcion.remove(inscripcion);
    
            res.status(200).json({ mensaje: 'Inscripción eliminada exitosamente' });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
    
        
    
}

export default new InscripcionesController();
