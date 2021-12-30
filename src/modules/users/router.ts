import { Request, Response, Router } from 'express';
import { createUser } from './handlers';
import { UsersInterface } from './interfaces/usersInterface.interface';

export const usersRouter: Router = Router();

usersRouter.get('/', (request: Request, response: Response) => {
    createUser()
    response.send('Hello, World');
});

usersRouter.post('/create', (request: Request, response: Response) => {


    response.send(request.body)
});
