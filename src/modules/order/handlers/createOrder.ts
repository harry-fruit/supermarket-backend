import { OrderEntity } from "../entities/Order.entity";
import { OrderInterface } from "../interfaces/Order.interface";

export const createOrder = async (payload: OrderInterface): Promise<any> => {
    console.log(payload)
    const result = await OrderEntity.create({ ...payload });
    return result;
};