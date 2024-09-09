import { DataSource } from "typeorm";
import { Estudiante } from "../models/estudianteModel";
import { Profesor } from "../models/profesorModel";
import { Curso } from "../models/cursoModel";
import { Inscripcion } from "../models/inscripcionesModel";

export const AppDataSource= new DataSource({
    type: 'mysql',
    host:'127.0.0.1',
    username:'root',
    password:'',
    database:'universidad',
    logging:true,
    entities:[Estudiante,Profesor,Curso,Inscripcion],
    synchronize:false
   

})
