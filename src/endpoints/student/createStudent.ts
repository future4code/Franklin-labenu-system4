import { Request, Response } from "express";
import ClassDatabase from "../../data/ClassDatabase";
import StudentDatabase from "../../data/StudentDatabase";
import IdGenerator from "../../services/IdGenerator";
import { Student } from "../../types";

async function createStudent(req: Request, res: Response): Promise<void> {
    try {
        const { nome, email, data_nasc, turma_id } = req.body;

        if (!nome || !email || !data_nasc || !turma_id) {
            res.statusCode = 400;
            throw new Error("Por favor informe 'nome', 'email', 'data_nasc' e 'turma_id'");
        }

        const studentDB: StudentDatabase = new StudentDatabase();
        const alreadyHasEmail: any = await studentDB.getByEmail(email);
        
        if (alreadyHasEmail) {
            res.statusCode = 400;
            throw new Error("Email já cadastrado");
        }

        const classDB: ClassDatabase = new ClassDatabase();
        const classExists: any = await classDB.getById(turma_id);

        if (!classExists) {
            res.statusCode = 400;
            throw new Error("ID da turma não exite");
        }

        const idGen: IdGenerator = new IdGenerator();
        const id: string = idGen.generateId();
        const newStudent: Student = { id, nome, email, data_nasc, turma_id };

        await studentDB.create(newStudent);

        res.status(201).end();
    } catch(error: any){
        const { message } = error;

        console.error(message);
        if (res.statusCode === 200) {
            res.status(500).send({ message: "Internal server error" });
        } else {
            res.send({ message });
        }
    }
}

export default createStudent;
