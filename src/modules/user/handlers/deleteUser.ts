import { UserEntity } from "../entities/User.entity";

export const deleteUser = async (id: number): Promise<number> => {
  const isDeleted: number = await UserEntity.destroy({ where: { id } });
  return isDeleted;
};
