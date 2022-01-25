import { Model } from "sequelize/dist";
import { UpdateUserDto } from "../dto/updateUser.dto";
import { UserEntity } from "../entities/User.entity";
import { UserInterface } from "../interfaces/User.interface";

export const updateUser = async (payload: UpdateUserDto): Promise<Model<UserInterface> | null>  => {
  const { cpf, ...fieldsToUpdate } = payload;

  let user = await UserEntity.findOne({ where: { cpf } })

  if (!user) {
    return null;
  }

  const [ didUpdate ] = await UserEntity.update(fieldsToUpdate, { where: { cpf }, limit: 1 });

  if (!didUpdate){
    return null;
  }

  user = (await UserEntity.findOne({ where: { cpf } }));

  return user;
};
