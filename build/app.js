"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const method_override_1 = __importDefault(require("method-override"));
const estudiantesRoutes_1 = __importDefault(require("./routes/estudiantesRoutes"));
const profesoresRoutes_1 = __importDefault(require("./routes/profesoresRoutes"));
const cursosRoutes_1 = __importDefault(require("./routes/cursosRoutes"));
const inscripcionesRoutes_1 = __importDefault(require("./routes/inscripcionesRoutes"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, '../src/views'));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use((0, method_override_1.default)('_method'));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.get('/', (req, res) => {
    res.render('index', { title: 'App Universidad' });
});
app.use('/estudiantes', estudiantesRoutes_1.default);
app.use('/profesores', profesoresRoutes_1.default);
app.use('/cursos', cursosRoutes_1.default);
app.use('/inscripciones', inscripcionesRoutes_1.default);
app.use((req, res, next) => {
    console.log(`Ruta solicitada: ${req.method} ${req.url}`);
    next();
});
exports.default = app;
