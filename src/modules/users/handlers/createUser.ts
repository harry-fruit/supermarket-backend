// import { Bcrypt } from "../../../utils/Bcrypt";
// import { CreateUserInterface } from "../interfaces/createUserInterface.interface";
// import { UsersInterface } from "../interfaces/usersInterface.interface";

// export const createUser = async (payload: CreateUserInterface): Promise<Document<UsersInterface>> => {
//     const { password } = payload;
    
//     const hashedPassword = await Bcrypt.encrypt(password);
//     payload.password = hashedPassword;

//     // const result: any = await usersModel.create({ ...payload });
//     return result;
// }