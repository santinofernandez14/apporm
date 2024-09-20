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
const cursoModel_1 = require("../models/cursoModel");
const profesorModel_1 = require("../models/profesorModel");
class CursosController {
    insertar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, descripcion, profesor_id } = req.body;
            const errores = {};
            if (!nombre) {
                errores.nombre = 'El nombre es obligatorio';
            }
            else {
                if (nombre.length < 3 || nombre.length > 50) {
                    errores.nombre = 'El nombre debe tener entre 3 y 50 caracteres';
                }
                if (!/^[A-Za-z]+$/.test(nombre)) {
                    errores.nombre = 'El nombre solo puede contener letras';
                }
            }
            if (!descripcion) {
                errores.descripcion = 'La descripcion es obligatoria';
            }
            else {
                if (descripcion.length < 3 || descripcion.length > 50) {
                    errores.descripcion = 'La descripcion debe tener entre 3 y 50 caracteres';
                }
            }
            let profesor;
            if (!profesor_id || isNaN(Number(profesor_id))) {
                errores.profesor_id = 'El ID del profesor debe ser un numero valido.';
            }
            else {
                profesor = yield profesorModel_1.Profesor.findOneBy({ id: Number(profesor_id) });
                if (!profesor) {
                    errores.profesor_id = 'Profesor no encontrado.';
                }
            }
            if (Object.keys(errores).length > 0) {
                return res.render('insertarCurso', { errores, nombre, descripcion, profesor_id });
            }
            try {
                const curso = cursoModel_1.Curso.create({
                    nombre,
                    descripcion,
                    profesor: profesor || undefined
                });
                yield cursoModel_1.Curso.save(curso);
                res.redirect('/cursos/listar');
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
                const cursos = yield cursoModel_1.Curso.find({ relations: ['profesor'] });
                res.render('listarCursos', { cursos });
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
                const curso = yield cursoModel_1.Curso.findOne({
                    where: { id: Number(id) },
                    relations: ['profesor']
                });
                if (!curso) {
                    return res.status(404).send('Curso no encontrado');
                }
                const profesorId = curso.profesor ? curso.profesor.id : '';
                res.render('editarCurso', { curso, profesorId });
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
            const { id } = req.params;
            const { nombre, descripcion, profesor_id } = req.body;
            const errores = {};
            if (!nombre) {
                errores.nombre = 'El nombre es obligatorio';
            }
            else {
                if (nombre.length < 3 || nombre.length > 50) {
                    errores.nombre = 'El nombre debe tener entre 3 y 50 caracteres';
                }
                if (!/^[A-Za-z\s]+$/.test(nombre)) {
                    errores.nombre = 'El nombre solo puede contener letras';
                }
            }
            if (!descripcion) {
                errores.descripcion = 'La descripcion es obligatoria';
            }
            else {
                if (descripcion.length < 3) {
                    errores.descripcion = 'La descripcion debe tener al menos 3 caracteres';
                }
            }
            if (!profesor_id || isNaN(Number(profesor_id))) {
                errores.profesor_id = 'El ID del profesor debe ser un número valido';
            }
            else {
                const profesor = yield profesorModel_1.Profesor.findOneBy({ id: Number(profesor_id) });
                if (!profesor) {
                    errores.profesor_id = 'Profesor no encontrado';
                }
            }
            if (Object.keys(errores).length > 0) {
                const curso = yield cursoModel_1.Curso.findOneBy({ id: Number(id) });
                return res.render('editarCurso', { errores, curso, profesorId: profesor_id });
            }
            try {
                yield cursoModel_1.Curso.update(id, { nombre, descripcion, profesor: { id: Number(profesor_id) } });
                res.redirect('/cursos/listar');
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
                yield cursoModel_1.Curso.delete({ id: Number(id) });
                res.redirect('/cursos/listar');
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
}
exports.default = new CursosController();
