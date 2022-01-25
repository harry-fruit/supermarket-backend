import { Request, Response, Router } from "express";
import { Model } from "sequelize";
import { DeleteHandlerResponseType } from "../../utils/DeleteHandlerResponse";
import { HttpResponse, HttpResponseType } from "../../utils/HttpResponse";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { createUser } from "./handlers/createUser";
import { deleteUser } from "./handlers/deleteUser";
import { updateUser } from "./handlers/updateUser";
import { UserInterface } from "./interfaces/User.interface";
import { StatusCodes as HttpStatusCode , ReasonPhrases as HttpStatus } from 'http-status-codes';
import { getAllUsers, getUser } from "./handlers/getUser";

export const userRouter: Router = Router();

userRouter.post("/create-user", async (request: Request, response: Response): Promise<void> => {
    try {

      const user = await createUser(request.body as UserInterface);
      const handledResponse: HttpResponseType = HttpResponse(HttpStatus.CREATED, HttpStatusCode.CREATED, user);

      response
        .status(HttpStatusCode.CREATED)
        .send(handledResponse);
    
      } catch (error: any) {
      // throw HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, HttpStatusCode.INTERNAL_SERVER_ERROR, error);
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
      // next(HandlerExeption( HttpStatus.INTERNAL_SERVER_ERROR, HttpStatusCode.INTERNAL_SERVER_ERROR, error));
    }
  }
);

userRouter.get(
  "/:rg",
  async (request: Request, response: Response): Promise<void> => {
    try {
      const { rg } = request.params;

      const user: Model<UserInterface> = await getUser(rg);
      const formattedResponse: HttpResponseType = HttpResponse(HttpStatus.OK, HttpStatusCode.OK, user);

      response.send(formattedResponse);
    } catch (error: any) {
      // throw HandlerExeption(HttpStatus.INTERNAL_SERVER_ERROR, HttpStatusCode.INTERNAL_SERVER_ERROR, error);
    }
  }
);

//TODO: Fixar retorno
userRouter.patch("/update-user", async (request: Request, response: Response): Promise<void> => {
    try {
      const updateResponse = await updateUser(request.body as UpdateUserDto);
      const formattedResponse = HttpResponse(HttpStatus.CREATED, HttpStatusCode.CREATED, updateResponse);

      response
        .status(HttpStatusCode.CREATED)
        .send(formattedResponse);

    } catch (error: any) {
      // throw HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, HttpStatusCode.INTERNAL_SERVER_ERROR, error);
    }
  }
);

//TODO: Fixar retorno
userRouter.delete( "/delete-user", async (request: Request, response: Response): Promise<void> => {
    try {

      const { id } = request.body;
      const isDeleted: DeleteHandlerResponseType = await deleteUser(id);
      const formattedResponse = HttpResponse(HttpStatus.ACCEPTED, HttpStatusCode.ACCEPTED, isDeleted)
      
      response
        .status(HttpStatusCode.ACCEPTED)
        .send(formattedResponse);
      
    } catch (error: any) {
      throw HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, HttpStatusCode.INTERNAL_SERVER_ERROR, error);
    }
  }
);
