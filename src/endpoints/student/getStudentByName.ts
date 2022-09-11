import { Request, Response } from "express";
import StudentDatabase from "../../data/StudentDatabase";

async function getStudentByName(req: Request, res: Response): Promise<void> {
    try {
        const { nome } = req.body;

        if (!nome) {
            res.statusCode = 400;
            throw new Error("Por favor informe o 'nome'");
        }

        const studentDB: StudentDatabase = new StudentDatabase();
        const result: any = await studentDB.getByName(nome);

        res.send({ query: result });
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

export default getStudentByName;
