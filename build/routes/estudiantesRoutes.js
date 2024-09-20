"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const estudiantesController_1 = __importDefault(require("../controllers/estudiantesController"));
const router = express_1.default.Router();
router.get('/insertar', (req, res) => {
    res.render('insertarEstudiante');
});
router.post('/insertar', estudiantesController_1.default.insertar);
router.get('/listar', estudiantesController_1.default.listar);
router.get('/editar/:id', estudiantesController_1.default.editar);
router.put('/modificar', estudiantesController_1.default.modificar);
router.get('/eliminar/:id', estudiantesController_1.default.eliminar);
exports.default = router;
