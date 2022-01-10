import { Request, Response, Router } from "express";
import { HttpHandlerExeption } from "../../utils/HttpHandlerExeption";
import { createOrder } from "./handlers/createOrder";
import { OrderInterface } from "./interfaces/Order.interface";

export const orderRouter: Router = Router();

orderRouter.post('/create-order', async (request: Request, response: Response): Promise<void> => {
    
    try {
        const order = await createOrder(request.body as OrderInterface);
        const handledResponse = new HttpHandlerExeption("created", 201, order);
        response.send(handledResponse);

    } catch (error: any) {
        throw new Error(error);
    }
    
});