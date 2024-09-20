"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inscripcionesController_1 = __importDefault(require("../controllers/inscripcionesController"));
const router = (0, express_1.Router)();
router.get('/listar', inscripcionesController_1.default.listar);
router.get('/insertar', (req, res) => res.render('insertarInscripcion'));
router.post('/insertar', inscripcionesController_1.default.insertar);
router.get('/editar/:curso_id/:estudiante_id', inscripcionesController_1.default.editar);
router.put('/modificar/:curso_id/:estudiante_id', inscripcionesController_1.default.modificar);
router.post('/eliminar/:curso_id/:estudiante_id', inscripcionesController_1.default.eliminar);
exports.default = router;
