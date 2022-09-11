import * as bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

class HashManager {
    public generateHash = async (password: string): Promise<string> => {
        const rounds: number = Number(process.env.BCRYPT_COST_FACTOR as string);
        const salt: string = await bcrypt.genSalt(rounds);
        const result: string = await bcrypt.hash(password, salt);

        return result;
    };

    public compareHash = async (password: string, hash: string): Promise<boolean> => {
        return bcrypt.compare(password, hash);
    };
}

export default HashManager;
