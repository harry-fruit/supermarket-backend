import { UpdateHandlerResponseType } from "../../../utils/UpdateHandlerResponse";
import { UpdateUserDto } from "../dto/updateUser.dto";
import { UserEntity } from "../entities/User.entity";

export const updateUser = async (payload: UpdateUserDto): Promise<UpdateHandlerResponseType>  => {
  const { rg, ...fieldsToUpdate } = payload;
  const response = await UserEntity.update(fieldsToUpdate, { where: { rg } });
  console.log(response)
  return response;
};
