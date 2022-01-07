// import { HttpHandlerExeption } from "../../../utils/HttpHandlerExeption";

// export const getAllUsers = async () => {
//     try {
//         //TODO: get it paginated
//         // const allUsers = await usersModel.find();
//         return allUsers;
//     } catch(error: any) {
//         throw new HttpHandlerExeption('Internal Server Error', 500, error).onError()
//     }
// }

// export const getUser = async (rg: string): Promise<Document> => {
//     try {
//         // const user: Document | null = await usersModel.findOne({ rg });

//         if (!user){
//             throw new HttpHandlerExeption('Not found', 404, 'User not found.').onError();
//         }

//         return user;

//     } catch(error: any) {
//         throw new HttpHandlerExeption('Internal Server Error', 500, error).onError()
//     }
// }