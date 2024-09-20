"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profesoresController_1 = __importDefault(require("../controllers/profesoresController"));
const router = express_1.default.Router();
router.get('/insertar', (req, res) => {
    res.render('insertarProfesor');
});
router.post('/insertar', profesoresController_1.default.insertar);
router.get('/listar', profesoresController_1.default.listar);
router.get('/editar/:id', profesoresController_1.default.editar);
router.put('/modificar', profesoresController_1.default.modificar);
router.get('/eliminar/:id', profesoresController_1.default.eliminar);
exports.default = router;
