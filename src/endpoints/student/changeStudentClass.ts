import { Request, Response } from "express";
import ClassDatabase from "../../data/ClassDatabase";
import StudentDatabase from "../../data/StudentDatabase";

async function changeStudentClass(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const { turma_id } = req.body;

        if (!id) {
            res.statusCode = 400;
            throw new Error("Por favor informe o ID do estudante");
        }

        if (!turma_id) {
            res.statusCode = 400;
            throw new Error("Por favor informe o 'turma_id'");
        }

        const studentDB: StudentDatabase = new StudentDatabase();
        const studentExist: any = await studentDB.getById(id);

        if (!studentExist) {
            res.statusCode = 404;
            throw new Error("Estudante não encontrado");
        }

        const classDB: ClassDatabase = new ClassDatabase();
        const classExist: any = await classDB.getById(turma_id);

        if (!classExist) {
            res.statusCode = 404;
            throw new Error("Turma não encontrada");
        }

        const affectedRows: number = await studentDB.changeClass(id, turma_id);

        if (affectedRows === 0) {
            res.statusCode = 404;
            throw new Error("Turma do estudante não atualizada");
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

export default changeStudentClass;
