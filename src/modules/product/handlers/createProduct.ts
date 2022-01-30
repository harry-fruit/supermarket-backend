import { Model } from "sequelize/dist";
import { ProductEntity } from "../entities/Product.entity";
import { ProductInterface } from "../interfaces/Product.interface";

export const CreateProduct = async (payload: ProductInterface): Promise<Model<ProductInterface> | string> => {
  try {
    const { UniqueCode } = payload;

    const productExists: Model<ProductInterface> | null = await ProductEntity.findOne({ where: { UniqueCode } });

    if (productExists) {
      return `The Unique Code '${UniqueCode}' is not available.`;
    };
  
    const result: Model<ProductInterface> = await ProductEntity.create({ ...payload });
    return result;
  } 
  catch (error) {
    throw error;
  };
};
