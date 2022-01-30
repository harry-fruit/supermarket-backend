import { ProductEntity } from "../entities/Product.entity";

export const DeleteProduct = async (Id: number): Promise<number> => {
  const isDeleted: number = await ProductEntity.destroy({ where: { Id } });
  return isDeleted;
};
