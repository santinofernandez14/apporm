"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const profesorModel_1 = require("../models/profesorModel");
class ProfesorController {
    insertar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dni, nombre, apellido, email, profesion, telefono } = req.body;
            const errores = {};
            if (!dni || !/^\d{8}$/.test(dni)) {
                errores.dni = 'El DNI debe contener exactamente 8 dígitos numéricos.';
            }
            else {
                const profesorExistente = yield profesorModel_1.Profesor.findOne({ where: { dni } });
                if (profesorExistente) {
                    errores.dni = 'Ya existe un profesor con este DNI.';
                }
            }
            if (!nombre) {
                errores.nombre = 'El nombre es obligatorio.';
            }
            else {
                if (nombre.length < 3) {
                    errores.nombre = 'El nombre debe tener al menos 3 letras.';
                }
                if (!/^[A-Za-z]+$/.test(nombre)) {
                    errores.nombre = 'El nombre solo puede contener letras.';
                }
            }
            if (!apellido) {
                errores.apellido = 'El apellido es obligatorio.';
            }
            else {
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
                const profesor = profesorModel_1.Profesor.create({ dni, nombre, apellido, email, profesion, telefono });
                yield profesorModel_1.Profesor.save(profesor);
                res.redirect('/profesores/listar');
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    modificar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, dni, nombre, apellido, email, profesion, telefono } = req.body;
            const errores = {};
            if (!dni || !/^\d{8}$/.test(dni)) {
                errores.dni = 'El DNI debe contener exactamente 8 digitos numéricos';
            }
            else {
                const profesorExistente = yield profesorModel_1.Profesor.findOne({ where: { dni } });
                if (profesorExistente && profesorExistente.id !== Number(id)) {
                    errores.dni = 'Ya existe otro profesor con este DNI';
                }
            }
            if (!nombre) {
                errores.nombre = 'El nombre es obligatorio';
            }
            else {
                if (nombre.length < 3) {
                    errores.nombre = 'El nombre debe tener al menos 3 letras';
                }
                if (!/^[A-Za-z]+$/.test(nombre)) {
                    errores.nombre = 'El nombre solo puede contener letras';
                }
            }
            if (!apellido) {
                errores.apellido = 'El apellido es obligatorio';
            }
            else {
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
                const profesor = yield profesorModel_1.Profesor.findOneBy({ id: Number(id) });
                return res.render('editarProfesor', { errores, profesor });
            }
            try {
                yield profesorModel_1.Profesor.update(id, { dni, nombre, apellido, email, profesion, telefono });
                res.redirect('/profesores/listar');
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profesores = yield profesorModel_1.Profesor.find();
                res.render('listarProfesores', { profesores });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    editar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const profesor = yield profesorModel_1.Profesor.findOneBy({ id: Number(id) });
                if (!profesor) {
                    return res.status(404).send('Profesor no encontrado');
                }
                res.render('editarProfesor', { profesor });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield profesorModel_1.Profesor.delete({ id: Number(id) });
                res.redirect('/profesores/listar');
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
}
exports.default = new ProfesorController();
