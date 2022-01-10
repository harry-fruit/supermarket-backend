import { UpdateUserDto } from "../dto/updateUser.dto";
import { UserEntity } from "../entities/User.entity";

export const updateUser = async (payload: UpdateUserDto) => {
    const { rg, ...fieldsToUpdate } = payload;
    const response = await UserEntity.update(fieldsToUpdate, { where: { rg }} );
    return response;
}