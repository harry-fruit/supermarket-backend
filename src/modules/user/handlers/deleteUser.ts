import { Op } from "sequelize"
import { UserEntity } from "../entities/User.entity"

export const deleteUser = async (id: string): Promise<number> => {

    const response: number = await UserEntity.destroy({ where: { id }});
    return response;
}