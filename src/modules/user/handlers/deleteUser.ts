import { UserEntity } from "../entities/User.entity";

export const DeleteUser = async (Id: number): Promise<number> => {
  const isDeleted: number = await UserEntity.destroy({ where: { Id } });
  return isDeleted;
};
