import { Request, Response } from "express";
import ClassDatabase from "../../data/ClassDatabase";
import TeacherDatabase from "../../data/TeacherDatabase";
import IdGenerator from "../../services/IdGenerator";
import { Teacher } from "../../types";

async function createTeacher (req: Request, res: Response): Promise<void>{
  try {
    const { nome, email, data_nasc, turma_id } = req.body;

    if (!nome || !email || !data_nasc || !turma_id){
        res.statusCode = 400;
        throw new Error('Por favor informe todos os  dados');
    };

    const teacherDB: TeacherDatabase = new TeacherDatabase();
    const alreadyHasEmail: any = await teacherDB.getByEmail(email);

    if (alreadyHasEmail) {  
        res.statusCode = 400;
        throw new Error("Email já cadastrado");
    }

    const classDB: ClassDatabase = new ClassDatabase();
    const classExists: any = await classDB.getById(turma_id)

    if (!classExists) {
        res.statusCode = 400;
        throw new Error("ID da turma não existe");
    }
  
    const idGen: IdGenerator = new IdGenerator();
    const id: string = idGen.generateId();
    const newTeacher: Teacher = {id, nome, email, data_nasc, turma_id};

    await teacherDB.create(newTeacher);

    res.status(201).end();
  } catch (error: any) {
    const { message } = error;

    console.error(message);
    if (res.statusCode === 200 ) {
        res.status(500).send({ message: 'Internal server error'});
    } else {
      res.send({ message});
    }
  }

}

export default createTeacher;