import { Model } from "sequelize/dist";
import { Bcrypt } from "../../../utils/Bcrypt";
import { UpdateUserDto } from "../dto/updateUser.dto";
import { UserEntity } from "../entities/User.entity";
import { UserInterface } from "../interfaces/User.interface";

export const UpdateUser = async (payload: UpdateUserDto): Promise<Model<UserInterface> | string>  => {
  const { Password, Cpf, Email } = payload;

  const emailExists: Model<UserInterface> | null = await UserEntity.findOne({ where: { Email } })
  const cpfExists  : Model<UserInterface> | null = await UserEntity.findOne({ where: { Cpf } })

  if (emailExists) {
    return `The E-Mail '${Email}' is not available.`
  } 
  else if (!cpfExists) {
    return `There are no Cpf '${Cpf}' associated to an User in our database.`
  };
  
  delete payload.Cpf;

  if (Password){
    const newPassword = await Bcrypt.encrypt(Password);
    payload.Password = newPassword;
  }

  const [ didUpdate ] = await UserEntity.update(payload, { where: { Cpf }, limit: 1 });

  if (!didUpdate){
    return "User can't be updated";
  }

  const updatedUser: Model<UserInterface> = (await UserEntity.findOne({ where: { Cpf } })) as Model<UserInterface>;

  return updatedUser;
};
