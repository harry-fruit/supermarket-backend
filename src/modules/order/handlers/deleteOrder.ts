import {
    DeleteHandlerResponse,
    DeleteHandlerResponseType,
  } from "../../../utils/DeleteHandlerResponse";
import { OrderEntity } from "../entities/Order.entity";
  
  export const deleteOrder = async (
    id: string
  ): Promise<DeleteHandlerResponseType> => {
    const response = await OrderEntity.destroy({ where: { id } });
  
    if (!response) {
      return DeleteHandlerResponse(response, "Order could not be delete.");
    }
    return DeleteHandlerResponse(response, "Order deleted.");
  };
  