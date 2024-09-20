"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cursosController_1 = __importDefault(require("../controllers/cursosController"));
const method_override_1 = __importDefault(require("method-override"));
const router = express_1.default.Router();
router.use((0, method_override_1.default)('_method'));
router.get('/listar', cursosController_1.default.listar);
router.get('/insertar', (req, res) => {
    res.render('insertarCurso');
});
router.post('/insertar', cursosController_1.default.insertar);
router.get('/editar/:id', cursosController_1.default.editar);
router.put('/editar/:id', cursosController_1.default.modificar);
router.get('/eliminar/:id', cursosController_1.default.eliminar);
exports.default = router;
