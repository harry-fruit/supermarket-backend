import { Request, Response, Router } from 'express';
import { HttpHandlerExeption } from '../../utils/HttpHandlerExeption';
import { createUser } from './handlers/createUser';
import { getAllUsers, getUser } from './handlers/getUsers';
import { UserInterface } from './interfaces/User.interface';

export const userRouter: Router = Router();

userRouter.post('/create-user', async (request: Request, response: Response): Promise<void> => {
    
    try {
        const user = await createUser(request.body as UserInterface);
        const handledResponse = new HttpHandlerExeption("created", 201, user);
        response.send(handledResponse);

    } catch (error: any) {
        throw new Error(error);
    }
    
});

userRouter.get('/', async (request: Request, response: Response): Promise<void> => {
    try {
        const limit = Number.parseInt(request.query.limit as string);
        const currentPage = Number.parseInt(request.query.currentPage as string);

        if(!limit || !currentPage){
            throw "You're not supplying the find parameters, try to pass the limit and the currentPage.";
        };
        
        const allUsers = await getAllUsers({ limit, currentPage })
        const formattedResponse = new HttpHandlerExeption('Sucess', 200, allUsers)
            .onSucess();
        
        response.send(formattedResponse);
    } catch (error: any) {
        throw new Error(error);
    }
});

userRouter.get('/:rg', async (request: Request, response: Response): Promise<void> => {
    try {
        const { rg } = request.params;
        const user = await getUser(rg);
        const formattedResponse = new HttpHandlerExeption('Sucess', 200, user);
        response.send(formattedResponse);
    } catch(error: any) {
        throw new HttpHandlerExeption("Internal Server Error", 500, error).onError();
    }
})

// userRouter.post('update-user', async (request: Request, response: Response): Promise<void> => {
//     try {
//         // const response = await 
//     } catch (error: any) {
//         throw new HttpHandlerExeption("Internal Server Error", 500, error).onError();
//     }
// });
