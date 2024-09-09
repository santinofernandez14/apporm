import express, {Request,Response} from 'express';
import cors from 'cors';
import morgan from 'morgan';
const app=express();
import "reflect-metadata";
import  estudianteRouter from './routes/estudiantesRoutes'
import profesorRouter from './routes/profesoresRoutes'
import  cursoRouter from './routes/cursosRoutes'
import inscripcionRouter from './routes/inscripcionRoutes'

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(morgan('dev'))


app.get('/', (req:Request,res:Response)=>{
    res.send(' App Universidad');
})

app.use('/estudiantes',estudianteRouter);
app.use('/profesores',profesorRouter);
app.use('/cursos',cursoRouter);
app.use('/inscripciones',inscripcionRouter);


export default app; 