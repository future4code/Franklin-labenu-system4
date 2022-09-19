import { Request, Response } from 'express';
import TeacherDatabase from "../../data/TeacherDatabase";

async function getAllTeachers (req: Request, res: Response): Promise<void> {
    try {
        const teacherDB: TeacherDatabase = new TeacherDatabase();
        const result: any = await teacherDB.getAll();

        res.send({teachers: result});        
    } catch (error: any) {
        const { message } = error;

        console.error(message);
        if (res.statusCode === 200) {
            res.status(500).send({message: "Internal server error"});
        } else {
            res.send({message});
        }
    }
}

export default getAllTeachers;