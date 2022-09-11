import { Class } from "../types";
import BaseDatabase from "./BaseDatabase";

class ClassDatabase extends BaseDatabase {
    private static dataBase: string = "Turma";

    public create = async (newClass: Class): Promise<void> => {
        await this.getConnection()(ClassDatabase.dataBase)
        .insert(newClass);
    };

    public getActive = async (): Promise<any> => {
        const result = await this.getConnection()(ClassDatabase.dataBase)
        .select()
        .whereNot({ modulo: "0" });

        return result;
    };

    public changeModule = async (id: string, newModule: string) => {
        const affectedRows: any = await this.getConnection()(ClassDatabase.dataBase)
        .update({ modulo: newModule })
        .where({ id });

        return Number(affectedRows);
    }
}

export default ClassDatabase;
