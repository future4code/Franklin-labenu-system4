import { Teacher } from "../types"
import BaseDatabase from "./BaseDatabase"

class TeacherDatabase extends BaseDatabase {
  private static dataBase: string = "Docente";

  public create = async (newTeacher: Teacher): Promise<void> => {
    await this.getConnection()(TeacherDatabase.dataBase)
    .insert(newTeacher);
  };

  public getByEmail = async(email: string): Promise<any> => {
    const [result] = await this.getConnection()(TeacherDatabase.dataBase)
    .select()
    .where({email});

    return result;
  };

  public getAll = async (): Promise<any> => {
    const result = await this.getConnection()(TeacherDatabase.dataBase)
    .select();

    return result;
  };

  public changeClass = async (id: string, turma_id: string): Promise<number> => {
    const affectedRows: any = await this.getConnection()(TeacherDatabase.dataBase)
    .update({ turma_id })
    .where({ id });

    return Number(affectedRows);
  };
}


export default TeacherDatabase;