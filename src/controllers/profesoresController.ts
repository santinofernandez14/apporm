
import { Request, Response } from "express";
import { Profesor } from "../models/profesorModel";


class ProfesorController {
    constructor() {

    }

    async consultar(req: Request, res: Response) {
        try {
            const data = await Profesor.find();
            res.status(200).json(data);
        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message);
        }

    }

    async consultarUno(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const registro = await Profesor.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Profesor no encontrado');
            }

            res.status(200).json(registro);
        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message);
        }
    }

    async insertar(req: Request, res: Response) {
        try {
            const registro = await Profesor.save(req.body);
            res.status(201).json(registro);
        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message);
        }
    }

    async modificar(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const registro = await Profesor.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Profesor no encontrado');
            }
            await Profesor.update({ id: Number(id) }, req.body);
            const registroActualizado = await Profesor.findOneBy({ id: Number(id) });
            res.status(200).json(registroActualizado);
        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message);
        }
    }

    async borrar(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const registro = await Profesor.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Profesor no encontrado');
            }
            await Profesor.delete({ id: Number(id) });
            res.status(200).json({ mensaje: 'Profesor eliminado exitosamente' });  // Mensaje de éxito
        } catch (err) {
            if (err instanceof Error)
                res.status(500).send(err.message);
        }
    }
}

export default new ProfesorController();