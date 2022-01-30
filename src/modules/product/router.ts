import { Request, Response, Router } from "express";
import { HttpResponse } from "../../utils/HttpResponse";
import { CreateProduct } from "./handlers/CreateProduct";
import { ProductInterface } from "./interfaces/Product.interface";

export const productRouter: Router = Router();

productRouter.post(
  "/create-product",
  async (request: Request, response: Response): Promise<void> => {
    try {
        const product = await CreateProduct(request.body as ProductInterface);
        const handledResponse = HttpResponse("created", 201, product);
        response.send(handledResponse);

    } catch (error: any) {
        throw new Error(error);
    }
  }
);
