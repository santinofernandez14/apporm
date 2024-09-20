import { createConnection } from 'mysql2/promise';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Profesor } from '../models/profesorModel';
import { Estudiante } from '../models/estudianteModel';
import { Curso } from '../models/cursoModel';
import { Inscripcion } from '../models/inscripcionesModel';

// Cargar las variables de entorno
dotenv.config();

// Definir el puerto como número, si no se define usar 3306 por defecto
const port: number = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;

// Función para crear la base de datos si no existe
async function createDatabaseIfNotExists() {
    try {
        // Conectar al servidor MySQL sin especificar la base de datos
        const connection = await createConnection({
            host: process.env.DB_HOST,
            port,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        });

        // Crear la base de datos si no existe
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log(`Base de datos "${process.env.DB_NAME}" creada o ya existente.`);

        // Cerrar la conexión a MySQL
        await connection.end();
    } catch (error) {
        console.error('Error al crear la base de datos:', error);
        throw error; // Lanza el error si la creación de la base de datos falla
    }
}

// Configuración de TypeORM para conectar con la base de datos
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Profesor, Estudiante, Curso,Inscripcion],
    synchronize: false, // Crea las tablas automáticamente si no existen
    logging: true,     // Muestra logs en la consola para depuración
});

// Función para inicializar la base de datos
export async function initializeDatabase() {
    try {
        // Crear la base de datos si no existe
        await createDatabaseIfNotExists();

        // Inicializar la conexión con TypeORM
        await AppDataSource.initialize();
        console.log('Conexión establecida con la base de datos y tablas sincronizadas.');
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
        throw error; // Lanza el error si la inicialización de la base de datos falla
    }
}
