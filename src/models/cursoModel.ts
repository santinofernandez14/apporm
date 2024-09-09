import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Profesor } from "./profesorModel";
import { Estudiante } from "./estudianteModel";

@Entity('cursos')
export class Curso extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: String;

    @Column('text')
    descripcion: String;

   

    @ManyToOne(() => Profesor, (profesor) => profesor.cursos)
    @JoinColumn({ name: 'profesor_id' })
    profesor: Profesor;

    @ManyToMany(() => Estudiante)
    
    estudiantes: Estudiante[];
}