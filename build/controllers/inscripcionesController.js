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
const inscripcionesModel_1 = require("../models/inscripcionesModel");
const cursoModel_1 = require("../models/cursoModel");
const estudianteModel_1 = require("../models/estudianteModel");
class InscripcionesController {
    insertar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { curso_id, estudiante_id, nota } = req.body;
            const errores = {};
            if (!curso_id || isNaN(Number(curso_id))) {
                errores.curso_id = 'El ID del curso debe ser un numero valido';
            }
            else {
                const curso = yield cursoModel_1.Curso.findOneBy({ id: Number(curso_id) });
                if (!curso) {
                    errores.curso_id = 'Curso no encontrado';
                }
            }
            if (!estudiante_id || isNaN(Number(estudiante_id))) {
                errores.estudiante_id = 'El ID del estudiante debe ser un número válido';
            }
            else {
                const estudiante = yield estudianteModel_1.Estudiante.findOneBy({ id: Number(estudiante_id) });
                if (!estudiante) {
                    errores.estudiante_id = 'Estudiante no encontrado';
                }
            }
            if (!nota || isNaN(Number(nota))) {
                errores.nota = 'La nota es obligatoria y debe ser un número valido';
            }
            else if (Number(nota) < 1 || Number(nota) > 10) {
                errores.nota = 'La nota debe estar entre 1 y 10';
            }
            if (Object.keys(errores).length > 0) {
                return res.render('insertarInscripcion', { errores, curso_id, estudiante_id, nota });
            }
            try {
                const inscripcion = inscripcionesModel_1.Inscripcion.create({
                    curso_id,
                    estudiante_id,
                    nota: Number(nota)
                });
                yield inscripcionesModel_1.Inscripcion.save(inscripcion);
                res.redirect('/inscripciones/listar');
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
                const inscripciones = yield inscripcionesModel_1.Inscripcion.find({ relations: ['curso', 'estudiante'] });
                res.render('listarInscripciones', { inscripciones });
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
            const { curso_id, estudiante_id } = req.params;
            try {
                const inscripcion = yield inscripcionesModel_1.Inscripcion.findOne({
                    where: { curso_id: Number(curso_id), estudiante_id: Number(estudiante_id) },
                    relations: ['curso', 'estudiante']
                });
                if (!inscripcion) {
                    return res.status(404).send('Inscripcion no encontrada');
                }
                res.render('editarInscripcion', { inscripcion });
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
            const { curso_id, estudiante_id } = req.params;
            const { nuevo_curso_id, nuevo_estudiante_id, nota } = req.body;
            const errores = {};
            if (!nuevo_curso_id || isNaN(Number(nuevo_curso_id))) {
                errores.curso_id = 'El ID del curso debe ser un numero valido.';
            }
            else {
                const curso = yield cursoModel_1.Curso.findOneBy({ id: Number(nuevo_curso_id) });
                if (!curso) {
                    errores.curso_id = 'Curso no encontrado.';
                }
            }
            if (!nuevo_estudiante_id || isNaN(Number(nuevo_estudiante_id))) {
                errores.estudiante_id = 'El ID del estudiante debe ser un número válido.';
            }
            else {
                const estudiante = yield estudianteModel_1.Estudiante.findOneBy({ id: Number(nuevo_estudiante_id) });
                if (!estudiante) {
                    errores.estudiante_id = 'Estudiante no encontrado.';
                }
            }
            if (!nota || isNaN(Number(nota)) || Number(nota) < 1 || Number(nota) > 10) {
                errores.nota = 'La nota debe ser un numero entre 1 y 10.';
            }
            if (Object.keys(errores).length > 0) {
                const inscripcion = yield inscripcionesModel_1.Inscripcion.findOne({ where: { curso_id: Number(curso_id), estudiante_id: Number(estudiante_id) } });
                return res.render('editarInscripcion', { errores, inscripcion });
            }
            try {
                yield inscripcionesModel_1.Inscripcion.update({ curso_id: Number(curso_id), estudiante_id: Number(estudiante_id) }, {
                    curso_id: Number(nuevo_curso_id),
                    estudiante_id: Number(nuevo_estudiante_id),
                    nota: Number(nota),
                });
                res.redirect('/inscripciones/listar');
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
            const { curso_id, estudiante_id } = req.params;
            try {
                const result = yield inscripcionesModel_1.Inscripcion.delete({
                    curso_id: Number(curso_id),
                    estudiante_id: Number(estudiante_id),
                });
                if (result.affected === 0) {
                    return res.status(404).send('Inscripcion no encontrada.');
                }
                res.redirect('/inscripciones/listar');
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
}
exports.default = new InscripcionesController();
