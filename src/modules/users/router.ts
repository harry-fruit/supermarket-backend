import { Request, Response, Router } from 'express';
import { createUser } from './handlers';
import { UsersInterface } from './interfaces/usersInterface.interface';

export const usersRouter: Router = Router();

usersRouter.get('/', (request: Request, response: Response) => {
    response.send('Hello, World');
});

usersRouter.post('/create', async (request: Request, response: Response) => {
    
    try {
        const user = await createUser(request.body as UsersInterface);
        response.send()

    } catch (error: any) {
        throw new Error(error);
    }

});
