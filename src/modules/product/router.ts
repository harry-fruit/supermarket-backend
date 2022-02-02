import { Request, Response, Router } from "express";
import { Model } from "sequelize/dist";
import { HttpResponse, HttpResponseType } from "../../utils/HttpResponse";
import { CreateProduct } from "./handlers/CreateProduct";
import { ProductInterface } from "./interfaces/Product.interface";
import { StatusCodes as HttpStatusCode , ReasonPhrases as HttpStatus } from 'http-status-codes';
import { ErrorHandler } from "../../utils/ErrorHandler";
import { GetProductById } from "./handlers/GetProduct";

export const productRouter: Router = Router();

productRouter.post("/create-product", async (request: Request, response: Response): Promise<void> => {
  try {
    const payload = request.body as ProductInterface;
    
    const handledResponse: Model<ProductInterface> | string = await CreateProduct(payload);
    
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
});

productRouter.get("/get-product", async (request: Request, response: Response) => {
  try {
    let { UniqueCode, Id } = request.query;
    
    if (!UniqueCode || !Id) {
      const message = "Please, insert a value to Id or Unique Code."
      const responsePayload = HttpResponse(HttpStatus.BAD_REQUEST, HttpStatusCode.BAD_REQUEST, message);

      response
        .status(HttpStatusCode.BAD_REQUEST)
        .send(responsePayload);
      
      return;
    }

    Id         = Id ? Id.toString() : '';
    UniqueCode = UniqueCode.toString();

    if (Id) {
      const handledResponse: Model<ProductInterface> | null = await GetProductById(Id);
    } else if (UniqueCode) {
      const handledResponse: Model<ProductInterface> | null = await GetProductById(Id);
    }

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
})
