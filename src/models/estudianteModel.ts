import { BaseEntity, Column,  Entity, PrimaryGeneratedColumn, ManyToMany} from "typeorm"
import { Curso } from "./cursoModel";
@Entity('estudiantes')
export class Estudiante extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dni: String;

    @Column()
    nombre: String;

    @Column()
    apellido: String;

    @Column()
    email: String;
    
    @ManyToMany(() => Curso, curso => curso.estudiantes)
    cursos: Curso[];
   
}