import app from "./app";
import { AppDataSource } from './db/conexion';

async function main() {
    try {
        await AppDataSource.initialize();
        console.log('Base de datos conectada');

        app.listen(3000, () => {
            console.log('Servidor activo en http://localhost:3000');
        });
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        }
    }
}

main();
