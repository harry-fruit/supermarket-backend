import { Request, Response, Router } from 'express';
import { HttpHandlerResponse } from '../../utils/HttpHandlerExeption';
import { UpdateUserDto } from './dto/updateUser.dto';
import { createUser } from './handlers/createUser';
import { deleteUser } from './handlers/deleteUser';
import { getAllUsers, getUser } from './handlers/getUsers';
import { updateUser } from './handlers/updateUser';
import { UserInterface } from './interfaces/User.interface';

export const userRouter: Router = Router();

userRouter.post('/create-user', async (request: Request, response: Response): Promise<void> => {
    
    try {
        const user = await createUser(request.body as UserInterface);
        const handledResponse = HttpHandlerResponse("created", 201, user);
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
        const formattedResponse = HttpHandlerResponse('Sucess', 200, allUsers);

        response.send(formattedResponse);
    } catch (error: any) {
        throw new Error(error);
    }
});

userRouter.get('/:rg', async (request: Request, response: Response): Promise<void> => {
    try {
        const { rg } = request.params;

        const user = await getUser(rg);
        const formattedResponse = HttpHandlerResponse('Sucess', 200, user);

        response.send(formattedResponse);
    } catch(error: any) {
        throw HttpHandlerResponse("Internal Server Error", 500, error);
    }
})

userRouter.patch('/update-user', async (request: Request, response: Response): Promise<void> => {
    try {
        const updateResponse = await updateUser(request.body as UpdateUserDto);
        const formattedResponse = HttpHandlerResponse('Updated', 201, updateResponse);

        response.send(formattedResponse);
    } catch (error: any) {
        throw error;
    }
});

userRouter.delete('/delete-user', async (request: Request, response: Response): Promise<void> => {
    try{

        const { id } = request.body;
        const isDeleted: number = await deleteUser(id);
        response.send(isDeleted);

    } catch(error: any){
        throw error;
    }
})
