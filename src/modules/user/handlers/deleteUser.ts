import {
  DeleteHandlerResponse,
  DeleteHandlerResponseType,
} from "../../../utils/DeleteHandlerResponse";
import { UserEntity } from "../entities/User.entity";

export const deleteUser = async (
  id: number
): Promise<DeleteHandlerResponseType> => {
  try {
    const response = await UserEntity.destroy({ where: { id } });
  
    if (!response) {
      return DeleteHandlerResponse(response, "User could not be delete.");
    };

    return DeleteHandlerResponse(response, "User deleted.");

  } catch (error) {
    throw error;
  };
};
