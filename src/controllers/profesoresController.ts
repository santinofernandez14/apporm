import { Request, Response } from "express";
import { Profesor } from "../models/profesorModel";

class ProfesorController {
    async insertar(req: Request, res: Response) {
        const { dni, nombre, apellido, email, profesion, telefono } = req.body;
        const errores: { [key: string]: string } = {};

        // Validar DNI
        if (!dni || !/^\d{8}$/.test(dni)) {
            errores.dni = 'El DNI debe contener exactamente 8 dígitos numéricos.';
        } else {
            // Verificar si ya existe un profesor con el mismo DNI
            const profesorExistente = await Profesor.findOne({ where: { dni } });
            if (profesorExistente) {
                errores.dni = 'Ya existe un profesor con este DNI.';
            }
        }

        // Validar Nombre
        if (!nombre) {
            errores.nombre = 'El nombre es obligatorio.';
        } else {
            if (nombre.length < 3) {
                errores.nombre = 'El nombre debe tener al menos 3 letras.';
            }
            if (!/^[A-Za-z]+$/.test(nombre)) {
                errores.nombre = 'El nombre solo puede contener letras.';
            }
        }

        // Validar Apellido
        if (!apellido) {
            errores.apellido = 'El apellido es obligatorio.';
        } else {
            if (apellido.length < 3) {
                errores.apellido = 'El apellido debe tener al menos 3 letras.';
            }
            if (!/^[A-Za-z]+$/.test(apellido)) {
                errores.apellido = 'El apellido solo puede contener letras.';
            }
        }

        // Validar Email
        if (!email || !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) {
            errores.email = 'Debe ser un correo electrónico válido.';
        }

        // Validar Profesión
        if (!profesion || profesion.length < 3 || profesion.length > 100) {
            errores.profesion = 'La profesión debe tener entre 3 y 100 caracteres.';
        }

        // Validar Teléfono
        if (!telefono || !/^\d{7,15}$/.test(telefono)) {
            errores.telefono = 'El teléfono debe contener entre 7 y 15 dígitos numéricos.';
        }

        // Si hay errores, se renderiza la vista con los errores
        if (Object.keys(errores).length > 0) {
            return res.render('insertarProfesor', { errores, dni, nombre, apellido, email, profesion, telefono });
        }

        // Guardar profesor si no hay errores
        try {
            const profesor = Profesor.create({ dni, nombre, apellido, email, profesion, telefono });
            await Profesor.save(profesor);
            res.redirect('/profesores/listar');
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async modificar(req: Request, res: Response) {
        const { id, dni, nombre, apellido, email, profesion, telefono } = req.body;
        const errores: { [key: string]: string } = {};

        // Validar DNI
        if (!dni || !/^\d{8}$/.test(dni)) {
            errores.dni = 'El DNI debe contener exactamente 8 dígitos numéricos.';
        } else {
            // Verificar si ya existe un profesor con el mismo DNI y que no sea el actual
            const profesorExistente = await Profesor.findOne({ where: { dni } });
            if (profesorExistente && profesorExistente.id !== Number(id)) {
                errores.dni = 'Ya existe otro profesor con este DNI.';
            }
        }

        // Validar Nombre
        if (!nombre) {
            errores.nombre = 'El nombre es obligatorio.';
        } else {
            if (nombre.length < 3) {
                errores.nombre = 'El nombre debe tener al menos 3 letras.';
            }
            if (!/^[A-Za-z]+$/.test(nombre)) {
                errores.nombre = 'El nombre solo puede contener letras.';
            }
        }

        // Validar Apellido
        if (!apellido) {
            errores.apellido = 'El apellido es obligatorio.';
        } else {
            if (apellido.length < 3) {
                errores.apellido = 'El apellido debe tener al menos 3 letras.';
            }
            if (!/^[A-Za-z]+$/.test(apellido)) {
                errores.apellido = 'El apellido solo puede contener letras.';
            }
        }

        // Validar Email
        if (!email || !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) {
            errores.email = 'Debe ser un correo electrónico válido.';
        }

        // Validar Profesión
        if (!profesion || profesion.length < 3 || profesion.length > 100) {
            errores.profesion = 'La profesión debe tener entre 3 y 100 caracteres.';
        }

        // Validar Teléfono
        if (!telefono || !/^\d{7,15}$/.test(telefono)) {
            errores.telefono = 'El teléfono debe contener entre 7 y 15 dígitos numéricos.';
        }

        // Si hay errores, renderizar vista con los errores
        if (Object.keys(errores).length > 0) {
            const profesor = await Profesor.findOneBy({ id: Number(id) });
            return res.render('editarProfesor', { errores, profesor });
        }

        // Actualizar profesor si no hay errores
        try {
            await Profesor.update(id, { dni, nombre, apellido, email, profesion, telefono });
            res.redirect('/profesores/listar');
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const profesores = await Profesor.find();
            res.render('listarProfesores', { profesores });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async editar(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const profesor = await Profesor.findOneBy({ id: Number(id) });
            if (!profesor) {
                return res.status(404).send('Profesor no encontrado');
            }
            res.render('editarProfesor', { profesor });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async eliminar(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await Profesor.delete({ id: Number(id) });
            res.redirect('/profesores/listar');
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
}

export default new ProfesorController();
