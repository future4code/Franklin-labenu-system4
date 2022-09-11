import { Request, Response } from "express";
import ClassDatabase from "../data/ClassDatabase";

async function getActiveClass(req: Request, res: Response): Promise<void> {
    try {
        const classDB: ClassDatabase = new ClassDatabase();
        const result: any = await classDB.getActive();

        res.send({ active: result });
    } catch(error: any) {
        const { message } = error;

        console.error(message);
        if(res.statusCode === 200) {
            res.status(500).send({ message: "Internal server error" });
        } else {
            res.send({ message });
        }
    }
}

export default getActiveClass;
