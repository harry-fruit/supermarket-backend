import { Model } from "sequelize";
import { HttpResponse } from "../../../utils/HttpResponse";
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
    throw HttpResponse(
      "Internal Server Error",
      500,
      error
    );
  }
};

export const getUser = async (rg: string): Promise<Model<UserInterface>> => {
  try {
    const user: Model<UserInterface> | null = await UserEntity.findOne({ where: { rg } });

    if (!user) {
      throw HttpResponse(
        "Not found",
        404,
        { message: "User not found." }
      );
    }

    return user;
  } catch (error: any) {
    throw HttpResponse(
      "Internal Server Error",
      500,
      error
    );
  }
};
