import { Entity, Column, ManyToOne, JoinColumn, BaseEntity, PrimaryColumn } from "typeorm";
import { Curso } from "./cursoModel";
import { Estudiante } from "./estudianteModel";

@Entity('cursos_estudiantes')
export class Inscripcion extends BaseEntity {
    @PrimaryColumn()  // Establecemos curso_id como parte de la clave primaria compuesta
    curso_id: number;

    @PrimaryColumn()  // Establecemos estudiante_id como parte de la clave primaria compuesta
    estudiante_id: number;

    @ManyToOne(() => Curso)
    @JoinColumn({ name: 'curso_id' })  // Asociar con la columna curso_id
    curso: Curso;

    @ManyToOne(() => Estudiante)
    @JoinColumn({ name: 'estudiante_id' })  // Asociar con la columna estudiante_id
    estudiante: Estudiante;

    @Column('float')
    nota: number;
}
