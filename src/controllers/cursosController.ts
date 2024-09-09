import { Request, Response } from "express";
import { Curso } from "../models/cursoModel";
import { Profesor } from "../models/profesorModel";
import { Estudiante } from "../models/estudianteModel";


class CursosController {
    constructor() {

    }

    async consultar(req: Request, res: Response) {
        try {
            const cursos = await Curso.find();
            res.status(200).json(cursos);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
    
    

    async consultarUno(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const curso = await Curso.findOneBy({ id: Number(id) });
    
            if (!curso) {
                return res.status(404).json({ mensaje: 'Curso no encontrado' });
            }
    
            res.status(200).json(curso);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
    

    async insertar(req: Request, res: Response) {
        try {
            const { profesor } = req.body;

            const profesorRegistro = await Profesor.findOneBy({ id: Number(profesor) });
            if (!profesorRegistro) {
                throw new Error('Profesor no encontrado');
            }

            const registro = await Curso.save(req.body);
            res.status(201).json(registro);
        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message);
        }
    }
    

    async modificar(req: Request, res: Response) {
        const { id } = req.params;  
        const { nombre, descripcion, profesor_id } = req.body;  
    
        try {
           
            const curso = await Curso.findOneBy({ id: Number(id) });
    
            if (!curso) {
                return res.status(404).json({ mensaje: 'Curso no encontrado' });
            }
    
           
            if (profesor_id) {
                const profesor = await Profesor.findOneBy({ id: Number(profesor_id) });
                if (!profesor) {
                    return res.status(404).json({ mensaje: 'Profesor no encontrado' });
                }
                curso.profesor = profesor;  
            }
    
           
            if (nombre) curso.nombre = nombre;
            if (descripcion) curso.descripcion = descripcion;
    
            
            await Curso.save(curso);
    
            res.status(200).json({ mensaje: 'Curso modificado exitosamente', curso });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
    

   
    async borrar(req: Request, res: Response) {
        const { id } = req.params;
        try {
           
            const registro = await Curso.findOneBy({ id: Number(id) });
            if (!registro) {
                return res.status(404).json({ message: 'Curso no encontrado' });
            }
    
         
            await Curso.delete({ id: Number(id) });
    
          
            res.status(200).json({ mensaje: 'Curso eliminado exitosamente' }); 
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
    
    

    
}

export default new CursosController();