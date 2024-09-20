import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { IsEmail, IsNotEmpty, Length, IsNumberString, Matches } from "class-validator";

@Entity('estudiantes')
export class Estudiante extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column() 
    @IsNotEmpty({ message: 'El DNI es obligatorio' })
    @IsNumberString({}, { message: 'El DNI debe ser un número' }) 
    @Length(8, 8, { message: 'El DNI debe tener exactamente 8 dígitos' }) 
    dni!: string;

    @Column()
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @Length(3, 50, { message: 'El nombre debe tener entre 3 y 50 caracteres' })
    @Matches(/^[A-Za-z]+$/, { message: 'El nombre solo puede contener letras' })
    nombre!: string;
    
    @Column()
    @IsNotEmpty({ message: 'El apellido es obligatorio' })
    @Length(3, 50, { message: 'El apellido debe tener entre 3 y 50 caracteres' })
    @Matches(/^[A-Za-z]+$/, { message: 'El apellido solo puede contener letras' })
    apellido!: string;

    @Column()
    @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
    email!: string;
}
