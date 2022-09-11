import { Student } from "../types";
import BaseDatabase from "./BaseDatabase";

class StudentDatabase extends BaseDatabase {
    private static dataBase: string = "Estudante";

    public create = async (newStudent: Student): Promise<void> => {
        await this.getConnection()(StudentDatabase.dataBase)
        .insert(newStudent);
    };

    public getByEmail = async (email: string): Promise<any> => {
        const [result]: any = await this.getConnection()(StudentDatabase.dataBase)
        .select()
        .where({ email });

        return result;
    };

    public getByName = async (name: string): Promise<any> => {
        const result: any = await this.getConnection()(StudentDatabase.dataBase)
        .select()
        .whereLike("nome", `%${name}%`);

        return result;
    };

    public getById = async (id: string): Promise<any> => {
        const [result] = await this.getConnection()(StudentDatabase.dataBase)
        .select()
        .where({ id });

        return result;
    };

    public changeClass = async (id: string, turma_id: string): Promise<number> => {
        const affectedRows: any = await this.getConnection()(StudentDatabase.dataBase)
        .update({ turma_id })
        .where({ id });

        return Number(affectedRows);
    };
}

export default StudentDatabase;
