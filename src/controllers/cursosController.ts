import { Request, Response } from "express";
import { Curso } from "../models/cursoModel";
import { Profesor } from "../models/profesorModel";

class CursosController {

    // Método para insertar curso
    async insertar(req: Request, res: Response) {
        const { nombre, descripcion, profesor_id } = req.body;
        const errores: { nombre?: string, descripcion?: string, profesor_id?: string } = {};

        // Validar Nombre
        if (!nombre) {
            errores.nombre = 'El nombre es obligatorio.';
        } else {
            if (nombre.length < 3 || nombre.length > 50) {
                errores.nombre = 'El nombre debe tener entre 3 y 50 caracteres.';
            }
            if (!/^[A-Za-z]+$/.test(nombre)) {
                errores.nombre = 'El nombre solo puede contener letras.';
            }
        }

        // Validar Descripción
        if (!descripcion) {
            errores.descripcion = 'La descripción es obligatoria.';
        } else {
            if (descripcion.length < 3 || descripcion.length > 50) {
                errores.descripcion = 'La descripción debe tener entre 3 y 50 caracteres.';
            }
        }

        // Validar Profesor ID
        let profesor;
        if (!profesor_id || isNaN(Number(profesor_id))) {
            errores.profesor_id = 'El ID del profesor debe ser un número válido.';
        } else {
            profesor = await Profesor.findOneBy({ id: Number(profesor_id) });
            if (!profesor) {
                errores.profesor_id = 'Profesor no encontrado.';
            }
        }

        if (Object.keys(errores).length > 0) {
            return res.render('insertarCurso', { errores, nombre, descripcion, profesor_id });
        }
        

        try {
            const curso = Curso.create({ 
                nombre, 
                descripcion, 
                profesor: profesor || undefined  // Asignar el profesor solo si existe
            });
            await Curso.save(curso);
            res.redirect('/cursos/listar');
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    // Método para listar cursos
    async listar(req: Request, res: Response) {
        try {
            const cursos = await Curso.find({ relations: ['profesor'] });
            res.render('listarCursos', { cursos });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    
    async editar(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const curso = await Curso.findOne({
                where: { id: Number(id) },
                relations: ['profesor']  // Incluye la relación con Profesor
            });
            if (!curso) {
                return res.status(404).send('Curso no encontrado');
            }
    
            // Aquí se obtiene el id del profesor asociado al curso, si existe
            const profesorId = curso.profesor ? curso.profesor.id : '';
            res.render('editarCurso', { curso, profesorId });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    // Método para modificar curso
    async modificar(req: Request, res: Response) {
        const { id } = req.params;
        const { nombre, descripcion, profesor_id } = req.body;
        const errores: { nombre?: string, descripcion?: string, profesor_id?: string } = {};

        // Validaciones
        if (!nombre) {
            errores.nombre = 'El nombre es obligatorio';
        } else {
            if (nombre.length < 3 || nombre.length > 50) {
                errores.nombre = 'El nombre debe tener entre 3 y 50 caracteres';
            }
            if (!/^[A-Za-z\s]+$/.test(nombre)) {
                errores.nombre = 'El nombre solo puede contener letras';
            }
        }

        if (!descripcion) {
            errores.descripcion = 'La descripción es obligatoria';
        } else {
            if (descripcion.length < 3) {
                errores.descripcion = 'La descripción debe tener al menos 3 caracteres';
            }
        }

        if (!profesor_id || isNaN(Number(profesor_id))) {
            errores.profesor_id = 'El ID del profesor debe ser un número válido';
        } else {
            const profesor = await Profesor.findOneBy({ id: Number(profesor_id) });
            if (!profesor) {
                errores.profesor_id = 'Profesor no encontrado';
            }
        }

        if (Object.keys(errores).length > 0) {
            const curso = await Curso.findOneBy({ id: Number(id) });
            return res.render('editarCurso', { errores, curso, profesorId: profesor_id });
        }

        try {
            await Curso.update(id, { nombre, descripcion, profesor: { id: Number(profesor_id) } });
            res.redirect('/cursos/listar');
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
    

    async eliminar(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await Curso.delete({ id: Number(id) });
            res.redirect('/cursos/listar');
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
}

export default new CursosController();
