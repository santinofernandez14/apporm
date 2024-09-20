import { Request, Response } from "express";
import { Profesor } from "../models/profesorModel";

class ProfesorController {
    async insertar(req: Request, res: Response) {
        const { dni, nombre, apellido, email, profesion, telefono } = req.body;
        const errores: { [key: string]: string } = {};

       
        if (!dni || !/^\d{8}$/.test(dni)) {
            errores.dni = 'El DNI debe contener exactamente 8 dígitos numéricos.';
        } else {
           
            const profesorExistente = await Profesor.findOne({ where: { dni } });
            if (profesorExistente) {
                errores.dni = 'Ya existe un profesor con este DNI.';
            }
        }

       
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

      
        if (!email || !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) {
            errores.email = 'Debe ser un correo electrónico válido.';
        }

       
        if (!profesion || profesion.length < 3 || profesion.length > 100) {
            errores.profesion = 'La profesion debe tener entre 3 y 100 caracteres';
        }

        if (!/^[A-Za-z]+$/.test(profesion)) {
            errores.apellido = 'La profesion solo puede contener letras';
        }

      
        if (!telefono || !/^\d{7,15}$/.test(telefono)) {
            errores.telefono = 'El telefono debe contener entre 7 y 15 dígitos numéricos';
        }

       
        if (Object.keys(errores).length > 0) {
            return res.render('insertarProfesor', { errores, dni, nombre, apellido, email, profesion, telefono });
        }

       
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

       
        if (!dni || !/^\d{8}$/.test(dni)) {
            errores.dni = 'El DNI debe contener exactamente 8 digitos numéricos';
        } else {
            
            const profesorExistente = await Profesor.findOne({ where: { dni } });
            if (profesorExistente && profesorExistente.id !== Number(id)) {
                errores.dni = 'Ya existe otro profesor con este DNI';
            }
        }

      
        if (!nombre) {
            errores.nombre = 'El nombre es obligatorio';
        } else {
            if (nombre.length < 3) {
                errores.nombre = 'El nombre debe tener al menos 3 letras';
            }
            if (!/^[A-Za-z]+$/.test(nombre)) {
                errores.nombre = 'El nombre solo puede contener letras';
            }
        }

       
        if (!apellido) {
            errores.apellido = 'El apellido es obligatorio';
        } else {
            if (apellido.length < 3) {
                errores.apellido = 'El apellido debe tener al menos 3 letras';
            }
            if (!/^[A-Za-z]+$/.test(apellido)) {
                errores.apellido = 'El apellido solo puede contener letras';
            }
        }

      
        if (!email || !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) {
            errores.email = 'Debe ser un correo electronico valido';
        }

        if (!profesion || profesion.length < 3 || profesion.length > 100) {
            errores.profesion = 'La profesion debe tener entre 3 y 100 caracteres';
        }

        if (!/^[A-Za-z]+$/.test(profesion)) {
            errores.apellido = 'La profesion solo puede contener letras';
        }

       
        if (!telefono || !/^\d{7,15}$/.test(telefono)) {
            errores.telefono = 'El telefono debe contener entre 7 y 15 dígitos numericos';
        }

        if (Object.keys(errores).length > 0) {
            const profesor = await Profesor.findOneBy({ id: Number(id) });
            return res.render('editarProfesor', { errores, profesor });
        }

        
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
