import { Model } from "sequelize";
import { Bcrypt } from "../../../utils/Bcrypt";
import { UserEntity } from "../entities/User.entity";
import { UserInterface } from "../interfaces/User.interface";

export const CreateUser = async (payload: UserInterface): Promise<Model<UserInterface> | string> => {
  try {
    const { Password, Cpf, Email } = payload;

    const emailExists: Model<UserInterface> | null = await UserEntity.findOne({ where: { Email } })
    const cpfExists  : Model<UserInterface> | null = await UserEntity.findOne({ where: { Cpf } })

    if (emailExists) {
      return `The E-Mail '${Email}' is not available.`
    } 
    else if (cpfExists) {
      return `The CPF '${Cpf}' is not available.`
    };
    
    const hashedPassword = await Bcrypt.encrypt(Password);
    payload.Password = hashedPassword;
  
    const result: Model<UserInterface> = await UserEntity.create({ ...payload });
    return result;
    
  } 
  catch (error) {
    throw error;
  };
};
