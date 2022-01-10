import { HttpHandlerExeption } from "../../../utils/HttpHandlerExeption";
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
        throw new HttpHandlerExeption('Internal Server Error', 500, error).onError()
    }
}

export const getUser = async (rg: string): Promise<any> => {
    try {
        const user = await UserEntity.findOne({ where: { rg } })

        if (!user){
            throw new HttpHandlerExeption('Not found', 404, 'User not found.').onError();
        }

        return user;

    } catch(error: any) {
        throw new HttpHandlerExeption('Internal Server Error', 500, error).onError()
    }
}