import { Request, Response } from "express";
import ClassDatabase from "../data/ClassDatabase";

async function changeClassModule(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const { modulo } = req.body;

        if (!id) {
            res.statusCode = 400;
            throw new Error("Por favor informe o id da turma");
        }

        if (!modulo) {
            res.statusCode = 400;
            throw new Error("Por favor informe o modulo");
        }

        const classDB: ClassDatabase = new ClassDatabase();
        const affectedRows: number = await classDB.changeModule(id, modulo.toString());

        if (affectedRows === 0) {
            res.statusCode = 404;
            throw new Error("Modulo da turma não atualizado");
        }

        res.status(201).end();
    } catch(error: any) {
        const { message } = error;

        console.error(message);
        if (res.statusCode === 200) {
            res.status(500).send({ message: "Internal server error" });
        } else {
            res.send({ message });
        }
    }
}

export default changeClassModule;
