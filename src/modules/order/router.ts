import { Request, Response, Router } from "express";
import { HttpResponse } from "../../utils/HttpResponse";
import { CreateOrder } from "./handlers/createOrder";
import { OrderInterface } from "./interfaces/Order.interface";

export const orderRouter: Router = Router();

orderRouter.post('/create-order', async (request: Request, response: Response): Promise<void> => {
    
    try {
        const order = await CreateOrder(request.body as OrderInterface);
        const handledResponse = HttpResponse("created", 201, order);
        response.send(handledResponse);

    } catch (error: any) {
        throw new Error(error);
    }
    
});
