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
import { IsValidCPF } from "../../utils/Validators";

export const userRouter: Router = Router();

userRouter.post("/create-user", async (request: Request, response: Response): Promise<void> => {
    try {
      const payload = request.body as UserInterface;
      
      const { cpf } = payload;
      const isValidCPF = IsValidCPF(cpf);

      if(!isValidCPF){

        const message: string = 'Insert a valid CPF.'
        
        const responsePayload: HttpResponseType = HttpResponse(
          HttpStatus.NOT_ACCEPTABLE,
          HttpStatusCode.NOT_ACCEPTABLE, 
          message,
          );
        
        response
          .status(HttpStatusCode.NOT_ACCEPTABLE)
          .send(responsePayload);
          return;
      }
      
      
      const handledResponse: Model<UserInterface> | string = await createUser(payload);
      
      if(typeof handledResponse == 'string'){
        
        const responsePayload: HttpResponseType = HttpResponse(HttpStatus.NOT_ACCEPTABLE, HttpStatusCode.NOT_ACCEPTABLE, handledResponse);
        
        response
          .status(HttpStatusCode.NOT_ACCEPTABLE)
          .send(responsePayload);
          return;
      }

      const responsePayload: HttpResponseType = HttpResponse(HttpStatus.CREATED, HttpStatusCode.CREATED, handledResponse);

      response
        .status(HttpStatusCode.CREATED)
        .send(responsePayload);
      
      return;
    
      } catch (error: any) {
        throw ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, 500, error);
    };
  }
);

userRouter.get("/", async (request: Request, response: Response): Promise<void> => {
    try {
      const limit = Number.parseInt(request.query.limit as string);
      const currentPage = Number.parseInt(request.query.currentPage as string);

      const handledResponse: Model<UserInterface>[] | string = await getAllUsers({ limit, currentPage });
      
      if(typeof handledResponse == 'string'){
        
        const responsePayload: HttpResponseType = HttpResponse(HttpStatus.BAD_REQUEST, HttpStatusCode.BAD_REQUEST, handledResponse);
        
        response
          .status(HttpStatusCode.BAD_REQUEST)
          .send(responsePayload);
          return;
      }

      const responsePayload: HttpResponseType = HttpResponse(HttpStatus.OK, HttpStatusCode.OK, handledResponse);

      response
        .status(HttpStatusCode.OK)
        .send(responsePayload);

        
      } catch (error: any) {
      throw ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, 500, error);
    }
  }
);

userRouter.get("/get-user", async (request: Request, response: Response): Promise<void> => {
    try {
      let { cpf } = request.query;
      
      if (!cpf) {
        const message = "Please, insert a value to CPF."
        const responsePayload = HttpResponse(HttpStatus.BAD_REQUEST, HttpStatusCode.BAD_REQUEST, message);

        response
          .status(HttpStatusCode.BAD_REQUEST)
          .send(responsePayload);
        
        return;
      }

      cpf = cpf.toString();

      const isValidCPF = IsValidCPF(cpf);

      if (!isValidCPF) {
        const message = "Please, insert a valid value to CPF."
        const responsePayload = HttpResponse(HttpStatus.BAD_REQUEST, HttpStatusCode.BAD_REQUEST, message);

        response
          .status(HttpStatusCode.BAD_REQUEST)
          .send(responsePayload);
        
        return;
      }

      const handledResponse: Model<UserInterface> | null = await getUser(cpf);

      if(!handledResponse) {
        const responsePayload = HttpResponse(HttpStatus.NOT_FOUND, HttpStatusCode.NOT_FOUND, {})
        response
          .status(HttpStatusCode.NOT_FOUND)
          .send(responsePayload);
        
        return;
      }

      const responsePayload: HttpResponseType = HttpResponse(HttpStatus.OK, HttpStatusCode.OK, handledResponse);

      response.send(responsePayload);
      
    } catch (error: any) {
      throw ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, 500, error)
    };
  }
);

userRouter.patch("/update-user", async (request: Request, response: Response): Promise<void> => {
    try {
      const payload = request.body as UpdateUserDto;
      
      const { cpf } = payload;
      
      if (!cpf) {
        const message: string = 'Insert a CPF.'
        
        const responsePayload: HttpResponseType = HttpResponse(
          HttpStatus.NOT_ACCEPTABLE,
          HttpStatusCode.NOT_ACCEPTABLE, 
          message,
          );
        
        response
          .status(HttpStatusCode.NOT_ACCEPTABLE)
          .send(responsePayload);
          return;
      }
    
      const isValidCPF = IsValidCPF(cpf);

      if(!isValidCPF){

        const message: string = 'Insert a valid CPF.'
        
        const responsePayload: HttpResponseType = HttpResponse(
          HttpStatus.NOT_ACCEPTABLE,
          HttpStatusCode.NOT_ACCEPTABLE, 
          message,
          );
        
        response
          .status(HttpStatusCode.NOT_ACCEPTABLE)
          .send(responsePayload);
          return;
      }
      
      const handledResponse: Model<UserInterface> | string  = await updateUser(request.body as UpdateUserDto);

      if(typeof handledResponse == 'string') {
        if (handledResponse === 'User not found.') {
          const responsePayload = HttpResponse(HttpStatus.NOT_FOUND, HttpStatusCode.NOT_FOUND, handledResponse);
          response
            .status(HttpStatusCode.NOT_FOUND)
            .send(responsePayload);
          
          return;
        } 
        else {
          const responsePayload = HttpResponse(HttpStatus.BAD_REQUEST, HttpStatusCode.BAD_REQUEST, handledResponse);
          response
            .status(HttpStatusCode.BAD_REQUEST)
            .send(responsePayload);
          return;

        }
      };

      const responsePayload = HttpResponse(HttpStatus.CREATED, HttpStatusCode.CREATED, handledResponse);

      response
        .status(HttpStatusCode.CREATED)
        .send(responsePayload);

    } catch (error: any) {
      throw ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, 500, error)
    };
  }
);

userRouter.delete( "/delete-user", async (request: Request, response: Response): Promise<void> => {
    try {

      const { id } = request.body;

      if(!id){
        const message = "Please, insert an Id"
        const responsePayload: HttpResponseType = HttpResponse(HttpStatus.BAD_REQUEST, HttpStatusCode.BAD_REQUEST, message)
        response
          .status(HttpStatusCode.BAD_REQUEST)
          .send(responsePayload);
        
        return;
      }
      
      const isDeleted: number = await deleteUser(id);

      if(!isDeleted) {
        const responsePayload: HttpResponseType = HttpResponse(HttpStatus.NOT_ACCEPTABLE, HttpStatusCode.NOT_ACCEPTABLE, "User Could not be deleted")
        response
          .status(HttpStatusCode.NOT_ACCEPTABLE)
          .send(responsePayload);
        
        return;
      }

      const responsePayload: HttpResponseType = HttpResponse(HttpStatus.ACCEPTED, HttpStatusCode.ACCEPTED, "User deleted");
      
      response
        .status(HttpStatusCode.ACCEPTED)
        .send(responsePayload);
      
    } catch (error: any) {
      throw ErrorHandler(HttpStatus.INTERNAL_SERVER_ERROR, 500, error)
    };
  }
);
