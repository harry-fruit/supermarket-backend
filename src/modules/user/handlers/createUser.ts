import { Model } from "sequelize";
import { Bcrypt } from "../../../utils/Bcrypt";
import { UserEntity } from "../entities/User.entity";
import { UserInterface } from "../interfaces/User.interface";

export const createUser = async (payload: UserInterface): Promise<Model<UserInterface> | string> => {
  try {
    const { password, cpf, email } = payload;

    const emailExists: Model<UserInterface> | null = await UserEntity.findOne({ where: { email } })
    const cpfExists  : Model<UserInterface> | null = await UserEntity.findOne({ where: { cpf } })

    if (emailExists) {
      return `The E-Mail '${email}' is not available.`
    } 
    else if (cpfExists) {
      return `The CPF '${cpf}' is not available.`
    };
    
    const hashedPassword = await Bcrypt.encrypt(password);
    payload.password = hashedPassword;
  
    const result: Model<UserInterface> = await UserEntity.create({ ...payload });
    return result;
    
  } 
  catch (error) {
    throw error;
  };
};
