import { Request, Response } from "express";
import ClassDatabase from "../../data/ClassDatabase";
import IdGenerator from "../../services/IdGenerator";
import { Class } from "../../types";

async function createClass(req: Request, res: Response): Promise<void> {
    try {
        const { nome, modulo } = req.body;

        if (!nome) {
            res.statusCode = 400;
            throw new Error("Por favor informe o nome da turma");
        }

        const idGen: IdGenerator = new IdGenerator();
        const id: string = idGen.generateId();
        const newClass: Class = { id, nome, modulo };
        const classDB: ClassDatabase = new ClassDatabase();
        await classDB.create(newClass);

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

export default createClass;