import { Request, Response } from "express";
import { Inscripcion } from "../models/inscripcionesModel";
import { Curso } from "../models/cursoModel";
import { Estudiante } from "../models/estudianteModel";

class InscripcionesController {

    // Método para insertar inscripción
    async insertar(req: Request, res: Response) {
        const { curso_id, estudiante_id, nota } = req.body;
        const errores: { curso_id?: string, estudiante_id?: string, nota?: string } = {};

        // Validar curso_id
        if (!curso_id || isNaN(Number(curso_id))) {
            errores.curso_id = 'El ID del curso debe ser un número válido.';
        } else {
            const curso = await Curso.findOneBy({ id: Number(curso_id) });
            if (!curso) {
                errores.curso_id = 'Curso no encontrado.';
            }
        }

        // Validar estudiante_id
        if (!estudiante_id || isNaN(Number(estudiante_id))) {
            errores.estudiante_id = 'El ID del estudiante debe ser un número válido.';
        } else {
            const estudiante = await Estudiante.findOneBy({ id: Number(estudiante_id) });
            if (!estudiante) {
                errores.estudiante_id = 'Estudiante no encontrado.';
            }
        }

        // Validar nota
        if (!nota || isNaN(Number(nota))) {
            errores.nota = 'La nota es obligatoria y debe ser un número válido.';
        } else if (Number(nota) < 1 || Number(nota) > 10) {
            errores.nota = 'La nota debe estar entre 1 y 10.';
        }

        if (Object.keys(errores).length > 0) {
            return res.render('insertarInscripcion', { errores, curso_id, estudiante_id, nota });
        }

        try {
            const inscripcion = Inscripcion.create({
                curso_id,
                estudiante_id,
                nota: Number(nota)
            });
            await Inscripcion.save(inscripcion);
            res.redirect('/inscripciones/listar');
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    // Método para listar inscripciones
    async listar(req: Request, res: Response) {
        try {
            const inscripciones = await Inscripcion.find({ relations: ['curso', 'estudiante'] });
            res.render('listarInscripciones', { inscripciones });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    // Método para editar inscripción
    async editar(req: Request, res: Response) {
        const { curso_id, estudiante_id } = req.params;
        try {
            const inscripcion = await Inscripcion.findOne({
                where: { curso_id: Number(curso_id), estudiante_id: Number(estudiante_id) },
                relations: ['curso', 'estudiante']
            });
            if (!inscripcion) {
                return res.status(404).send('Inscripción no encontrada');
            }

            res.render('editarInscripcion', { inscripcion });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async modificar(req: Request, res: Response) {
        const { curso_id, estudiante_id } = req.params;
        const { nuevo_curso_id, nuevo_estudiante_id, nota } = req.body;
        const errores: { curso_id?: string, estudiante_id?: string, nota?: string } = {};
    
        // Validar nuevo_curso_id
        if (!nuevo_curso_id || isNaN(Number(nuevo_curso_id))) {
            errores.curso_id = 'El ID del curso debe ser un número válido.';
        } else {
            const curso = await Curso.findOneBy({ id: Number(nuevo_curso_id) });
            if (!curso) {
                errores.curso_id = 'Curso no encontrado.';
            }
        }
    
        // Validar nuevo_estudiante_id
        if (!nuevo_estudiante_id || isNaN(Number(nuevo_estudiante_id))) {
            errores.estudiante_id = 'El ID del estudiante debe ser un número válido.';
        } else {
            const estudiante = await Estudiante.findOneBy({ id: Number(nuevo_estudiante_id) });
            if (!estudiante) {
                errores.estudiante_id = 'Estudiante no encontrado.';
            }
        }
    
        // Validar nota
        if (!nota || isNaN(Number(nota)) || Number(nota) < 1 || Number(nota) > 10) {
            errores.nota = 'La nota debe ser un número entre 1 y 10.';
        }
    
        // Si hay errores, renderizamos la vista de edición con los errores
        if (Object.keys(errores).length > 0) {
            const inscripcion = await Inscripcion.findOne({ where: { curso_id: Number(curso_id), estudiante_id: Number(estudiante_id) } });
            return res.render('editarInscripcion', { errores, inscripcion });
        }
    
        try {
            // Actualizar la inscripción
            await Inscripcion.update({ curso_id: Number(curso_id), estudiante_id: Number(estudiante_id) }, {
                curso_id: Number(nuevo_curso_id),
                estudiante_id: Number(nuevo_estudiante_id),
                nota: Number(nota),
            });
            res.redirect('/inscripciones/listar');
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
    


    async eliminar(req: Request, res: Response) {
        const { curso_id, estudiante_id } = req.params;
    
        try {
            const result = await Inscripcion.delete({
                curso_id: Number(curso_id),
                estudiante_id: Number(estudiante_id),
            });
            if (result.affected === 0) {
                return res.status(404).send('Inscripción no encontrada.');
            }
            res.redirect('/inscripciones/listar');
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
    
}

export default new InscripcionesController();
