import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import estudianteRouter from './routes/estudiantesRoutes';
import profesorRouter from './routes/profesoresRoutes';
import cursoRouter from './routes/cursosRoutes';
import inscripcionRouter from './routes/inscripcionesRoutes';

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../src/views'));


app.use(express.static(path.join(__dirname, '../public')));


app.use(methodOverride('_method'));
app.use(bodyParser.json());



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));


app.get('/', (req: Request, res: Response) => {
    res.render('index', { title: 'App Universidad' });
});


app.use('/estudiantes', estudianteRouter);
app.use('/profesores', profesorRouter);
app.use('/cursos', cursoRouter);
app.use('/inscripciones', inscripcionRouter);

app.use((req, res, next) => {
    console.log(`Ruta solicitada: ${req.method} ${req.url}`);
    next();
});


export default app;
