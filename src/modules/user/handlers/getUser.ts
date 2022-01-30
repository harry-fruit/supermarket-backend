import { Model } from "sequelize/dist";
import { FindAllFilter } from "../../../utils/types/FindAllFilter.type";
import { UserEntity } from "../entities/User.entity";
import { UserInterface } from "../interfaces/User.interface";

export const GetAllUsers = async (findParams: FindAllFilter): Promise<Model<UserInterface>[] | string> => {
  try {
    const { limit, currentPage } = findParams;

    if(!currentPage) {
      return "Please, insert the currentPage value."
    }

    const allUsers: Model<UserInterface>[] = await UserEntity.findAll({
      limit: limit || 10,
      offset: (limit || 10) * (currentPage - 1),
    });

    return allUsers;

  } catch (error: any) {
    throw error;
  }
};

export const GetUser = async (cpf: string): Promise<Model<UserInterface> | null> => {
  try{
    const user: Model<UserInterface> | null = await UserEntity.findOne({ where: { cpf } });
    
    return user;

  } catch (error) {
    throw error;
  };
};
