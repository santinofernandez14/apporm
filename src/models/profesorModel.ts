import {BaseEntity, Column,  Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Curso } from "./cursoModel";
@Entity('profesores')

export class Profesor  extends BaseEntity{
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

    @Column()
    profesion: String;

    @Column()
    telefono: String;

   

    @OneToMany(() => Curso,(curso)=>curso.profesor)
    cursos: Curso[]
}