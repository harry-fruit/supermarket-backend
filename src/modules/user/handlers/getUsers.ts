import { HttpHandlerResponse } from "../../../utils/HttpHandlerExeption";
import { FindAllFilter } from "../../../utils/interfaces/FindAllFilter.interface";
import { UserEntity } from "../entities/User.entity";

export const getAllUsers = async (findParams: FindAllFilter) => {
    try {
        const { limit, currentPage } = findParams; 

        const allUsers = await UserEntity.findAll({
            limit: limit || 10,
            offset: (limit || 10) * (currentPage - 1)
        });
        
        return allUsers;
    } catch(error: any) {
        throw HttpHandlerResponse('Internal Server Error', 500, error);
    }
}

export const getUser = async (rg: string): Promise<any> => {
    try {
        const user = await UserEntity.findOne({ where: { rg } })

        if (!user){
            throw HttpHandlerResponse('Not found', 404, 'User not found.');
        }

        return user;

    } catch(error: any) {
        throw HttpHandlerResponse('Internal Server Error', 500, error);
    }
}