import { Model } from "sequelize/dist";
import { FindAllFilter } from "../../../utils/types/FindAllFilter.type";
import { UserEntity } from "../entities/User.entity";
import { UserInterface } from "../interfaces/User.interface";

export const getAllUsers = async (findParams: FindAllFilter): Promise<Model<UserInterface>[]> => {
  try {
    const { limit, currentPage } = findParams;

    const allUsers: Model<UserInterface>[] = await UserEntity.findAll({
      limit: limit || 10,
      offset: (limit || 10) * (currentPage - 1),
    });

    return allUsers;

  } catch (error: any) {
    throw error
  }
};

export const getUser = async (rg: string): Promise<Model<UserInterface>> => {

    const user: Model<UserInterface> | null = await UserEntity.findOne({ where: { rg } });

    if (!user){
      throw "user doesn't exist";
    };

    return user;
};
