import { Bcrypt } from "../../../utils/Bcrypt";
import { UserEntity } from "../entities/User.entity";
import { UserInterface } from "../interfaces/User.interface";

export const createUser = async (payload: UserInterface): Promise<any> => {
    const { password } = payload;
    
    const hashedPassword = await Bcrypt.encrypt(password);
    payload.password = hashedPassword;

    const result = await UserEntity.create({ ...payload });
    return result;
};