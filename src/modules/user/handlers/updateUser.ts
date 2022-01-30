import { Model } from "sequelize/dist";
import { Bcrypt } from "../../../utils/Bcrypt";
import { UpdateUserDto } from "../dto/updateUser.dto";
import { UserEntity } from "../entities/User.entity";
import { UserInterface } from "../interfaces/User.interface";

export const UpdateUser = async (payload: UpdateUserDto): Promise<Model<UserInterface> | string>  => {
  const { password, cpf, email } = payload;

  const emailExists: Model<UserInterface> | null = await UserEntity.findOne({ where: { email } })
  const cpfExists  : Model<UserInterface> | null = await UserEntity.findOne({ where: { cpf } })

  if (emailExists) {
    return `The E-Mail '${email}' is not available.`
  } 
  else if (!cpfExists) {
    return `There are no cpf '${cpf}' associated to an User in our database.`
  };
  
  delete payload.cpf;

  if (password){
    const newPassword = await Bcrypt.encrypt(password);
    payload.password = newPassword;
  }

  const [ didUpdate ] = await UserEntity.update(payload, { where: { cpf }, limit: 1 });

  if (!didUpdate){
    return "User can't be updated";
  }

  const updatedUser: Model<UserInterface> = (await UserEntity.findOne({ where: { cpf } })) as Model<UserInterface>;

  return updatedUser;
};
