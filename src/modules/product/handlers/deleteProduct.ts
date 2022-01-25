import {
    DeleteHandlerResponse,
    DeleteHandlerResponseType,
  } from "../../../utils/DeleteHandlerResponse";
import { ProductEntity } from "../entities/Product.entity";
  
  export const deleteProduct = async (
    id: string
  ): Promise<DeleteHandlerResponseType> => {
    const response = await ProductEntity.destroy({ where: { id } });
  
    if (!response) {
      return DeleteHandlerResponse(response, "Product could not be delete.");
    }
    return DeleteHandlerResponse(response, "Product deleted.");
  };
  