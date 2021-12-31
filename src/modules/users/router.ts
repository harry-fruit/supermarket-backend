import { Request, Response, Router } from 'express';
import { HttpHandlerExeption } from '../../utils/HttpHandlerExeption';
import { createUser } from './handlers';
import { UsersInterface } from './interfaces/usersInterface.interface';

export const usersRouter: Router = Router();

usersRouter.get('/', (request: Request, response: Response) => {
    response.send('Hello, World');
});

usersRouter.post('/create-user', async (request: Request, response: Response): Promise<void> => {
    
    try {
        const user = await createUser(request.body as UsersInterface);
        const handledResponse = new HttpHandlerExeption("created", 201, user);
        response.send(handledResponse);

    } catch (error: any) {
        throw new Error(error);
    }

});

usersRouter.post('update-user', async (request: Request, response: Response) => {
    try {
        // const response = await 
    } catch (error: any) {
        throw new HttpHandlerExeption("Internal Server Error", 500, error).onError();
    }
});
