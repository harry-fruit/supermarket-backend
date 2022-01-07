import { Request, response, Response, Router } from 'express';
import { HttpHandlerExeption } from '../../utils/HttpHandlerExeption';
// import { createUser } from './handlers';
// import { getAllUsers, getUser } from './handlers/getUsers';
import { UsersInterface } from './interfaces/usersInterface.interface';

export const usersRouter: Router = Router();

usersRouter.get('/', async (request: Request, response: Response) => {
    response.send("What's up")
})

// usersRouter.post('/create-user', async (request: Request, response: Response): Promise<void> => {
    
//     try {
//         const user = await createUser(request.body as UsersInterface);
//         const handledResponse = new HttpHandlerExeption("created", 201, user);
//         response.send(handledResponse);

//     } catch (error: any) {
//         throw new Error(error);
//     }

// });

// usersRouter.get('/', async (request: Request, response: Response): Promise<void> => {
//     try {
//         const allUsers = await getAllUsers()
//         const formattedResponse = new HttpHandlerExeption('Sucess', 200, allUsers).onSucess();
//         response.send(formattedResponse);
//     } catch (error: any) {
//         throw new HttpHandlerExeption("Internal Server Error", 500, error).onError();
//     }
// });

// usersRouter.get('/:rg', async (request: Request, response: Response): Promise<void> => {
//     try {
//         const { rg } = request.params;
//         const user = await getUser(rg);
//         const formattedResponse = new HttpHandlerExeption('Sucess', 200, user);
//         response.send(formattedResponse);
//     } catch(error: any) {
//         throw new HttpHandlerExeption("Internal Server Error", 500, error).onError();
//     }
// })

// usersRouter.post('update-user', async (request: Request, response: Response): Promise<void> => {
//     try {
//         // const response = await 
//     } catch (error: any) {
//         throw new HttpHandlerExeption("Internal Server Error", 500, error).onError();
//     }
// });
