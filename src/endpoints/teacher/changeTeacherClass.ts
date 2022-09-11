import { Request, Response } from 'express';
import TeacherDatabase from '../../data/TeacherDatabase';
import ClassDatabase from '../../data/TeacherDatabase';

async function changeTeacherClass (req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const { turma_id } = req.body;

        if (!id) {
            res.statusCode = 400;
            throw new Error("Por favor informe o id.");
        } 
        if (!turma_id) {
            res.statusCode = 400;
            throw new Error("Por favor informe o id da turma.");
        }

        const teacherDB: TeacherDatabase = new TeacherDatabase();
        const affectedRows: number = await teacherDB.changeClass(id, turma_id)

        res.status(201).end()
    
    } catch (error: any) {
        const { message } = error;

        console.error(message);
        if (res.statusCode === 200) {
            res.status(500).send({ message: "Internal server error." });
        } else {
            res.send({ message });
        }
    } 
}

export default changeTeacherClass;