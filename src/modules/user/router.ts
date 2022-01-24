import { Request, Response, Router } from 'express';
import { DeleteHandlerResponseType } from '../../utils/DeleteHandlerResponse';
import { HttpResponse } from '../../utils/HttpResponse';
import { UpdateUserDto } from './dto/updateUser.dto';
import { createUser } from './handlers/createUser';
import { deleteUser } from './handlers/deleteUser';
import { getAllUsers, getUser } from './handlers/getUser';
import { updateUser } from './handlers/updateUser';
import { UserInterface } from './interfaces/User.interface';

export const userRouter: Router = Router();

userRouter.post(
  "/create-user",
  async (request: Request, response: Response): Promise<void> => {
    try {
        const user = await createUser(request.body as UserInterface);
        const handledResponse = HttpResponse("created", 201, user);
        response.send(handledResponse);

    } catch (error: any) {
      throw error;
    }
  }
);

userRouter.get(
  "/",
  async (request: Request, response: Response): Promise<void> => {
    try {
      
      const limit = Number.parseInt(request.query.limit as string);
      const currentPage = Number.parseInt(request.query.currentPage as string);

      if (!limit || !currentPage) {
        throw "You're not supplying the find parameters, try to pass the limit and the currentPage.";
      }

        if(!limit || !currentPage){
            throw "You're not supplying the find parameters, try to pass the limit and the currentPage.";
        };
        
        const allUsers = await getAllUsers({ limit, currentPage })
        const formattedResponse = HttpResponse('Sucess', 200, allUsers);

        response.send(formattedResponse);
    } catch (error: any) {
      throw error;
    }
  }
);

userRouter.get(
  "/:rg",
  async (request: Request, response: Response): Promise<void> => {
    try {
      const { rg } = request.params;

        const user = await getUser(rg);
        const formattedResponse = HttpResponse('Sucess', 200, user);

        response.send(formattedResponse);
    } catch(error: any) {
        throw error;
    }
  }
);

userRouter.patch(
  "/update-user",
  async (request: Request, response: Response): Promise<void> => {
    try {
        const updateResponse = await updateUser(request.body as UpdateUserDto);
        const formattedResponse = HttpResponse('Updated', 201, updateResponse);

      response.send(formattedResponse);
    } catch (error: any) {
      throw error;
    }
  }
);

userRouter.delete(
  "/delete-user",
  async (request: Request, response: Response): Promise<void> => {
    try {
      const { id } = request.body;
      const isDeleted: DeleteHandlerResponseType = await deleteUser(id);
      const formattedResponse = HttpResponse('Deleted', 200, isDeleted)
      response.send(formattedResponse);
    } catch (error: any) {
      throw error;
    }
  }
);
