import { Request, Response, Router } from "express";
import { Model } from "sequelize";
import { HttpResponse, HttpResponseType } from "../../utils/HttpResponse";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { createUser } from "./handlers/createUser";
import { deleteUser } from "./handlers/deleteUser";
import { updateUser } from "./handlers/updateUser";
import { UserInterface } from "./interfaces/User.interface";
import { StatusCodes as HttpStatusCode , ReasonPhrases as HttpStatus } from 'http-status-codes';
import { getAllUsers, getUser } from "./handlers/getUser";
import { ErrorHandler } from "../../utils/ErrorHandler";

export const userRouter: Router = Router();

userRouter.post("/create-user", async (request: Request, response: Response): Promise<void> => {
    try {

      const user = await createUser(request.body as UserInterface);
      const handledResponse: HttpResponseType = HttpResponse(HttpStatus.CREATED, HttpStatusCode.CREATED, user);

      response
        .status(HttpStatusCode.CREATED)
        .send(handledResponse);
    
      } catch (error: any) {
        throw ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, 500, error);
    };
  }
);

userRouter.get("/", async (request: Request, response: Response, next): Promise<void> => {
    try {
      const limit = Number.parseInt(request.query.limit as string);
      const currentPage = Number.parseInt(request.query.currentPage as string);

      const allUsers = await getAllUsers({ limit, currentPage });
      const formattedResponse = HttpResponse(HttpStatus.OK, HttpStatusCode.OK, allUsers);

      response
        .status(HttpStatusCode.OK)
        .send(formattedResponse);

        
      } catch (error: any) {
      throw ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, 500, error)
    }
  }
);

userRouter.get("/:cpf", async (request: Request, response: Response): Promise<void> => {
    try {
      const { cpf } = request.params;

      const user: Model<UserInterface> | null = await getUser(cpf);

      if(!user) {
        const responsePayload = HttpResponse(HttpStatus.NOT_FOUND, HttpStatusCode.NOT_FOUND, {})
        response
          .status(HttpStatusCode.NOT_FOUND)
          .send(responsePayload);
        
        return;
      }

      const formattedResponse: HttpResponseType = HttpResponse(HttpStatus.OK, HttpStatusCode.OK, user);

      response.send(formattedResponse);
      
    } catch (error: any) {
      throw ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, 500, error)
    };
  }
);

userRouter.patch("/update-user", async (request: Request, response: Response): Promise<void> => {
    try {
      const updateResponse = await updateUser(request.body as UpdateUserDto);

      if(!updateResponse) {
        const responsePayload = HttpResponse(HttpStatus.NOT_FOUND, HttpStatusCode.NOT_FOUND, {});
        response
          .status(HttpStatusCode.NOT_FOUND)
          .send(responsePayload);
        
        return;
      };

      const formattedResponse = HttpResponse(HttpStatus.CREATED, HttpStatusCode.CREATED, updateResponse);

      response
        .status(HttpStatusCode.CREATED)
        .send(formattedResponse);

    } catch (error: any) {
      throw ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, 500, error)
    };
  }
);

userRouter.delete( "/delete-user", async (request: Request, response: Response): Promise<void> => {
    try {

      const { id } = request.body;
      
      const isDeleted: number = await deleteUser(id);

      if(!isDeleted) {
        const responsePayload = HttpResponse(HttpStatus.NOT_ACCEPTABLE, HttpStatusCode.NOT_ACCEPTABLE, "User Could not be deleted")
        response
          .status(HttpStatusCode.NOT_ACCEPTABLE)
          .send(responsePayload);
        
        return;
      }

      const formattedResponse = HttpResponse(HttpStatus.ACCEPTED, HttpStatusCode.ACCEPTED, "User deleted");
      
      response
        .status(HttpStatusCode.ACCEPTED)
        .send(formattedResponse);
      
    } catch (error: any) {
      throw ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, 500, error)
    };
  }
);
