import { Entity, Column, ManyToOne, JoinColumn, BaseEntity, PrimaryColumn } from "typeorm";
import { Curso } from "./cursoModel";
import { Estudiante } from "./estudianteModel";

@Entity('cursos_estudiantes')
export class Inscripcion extends BaseEntity {
    @PrimaryColumn()  
    curso_id: number;

    @PrimaryColumn()  
    estudiante_id: number;

    @ManyToOne(() => Curso)
    @JoinColumn({ name: 'curso_id' })  
    curso: Curso;

    @ManyToOne(() => Estudiante)
    @JoinColumn({ name: 'estudiante_id' })  
    estudiante: Estudiante;

    @Column('float')
    nota: number;
}
