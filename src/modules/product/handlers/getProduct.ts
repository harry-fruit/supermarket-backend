import { Model } from "sequelize/dist";
import { FindAllFilter } from "../../../utils/types/FindAllFilter.type";
import { ProductEntity } from "../entities/Product.entity";
import { ProductInterface } from "../interfaces/Product.interface";

export const GetAllProducts = async (findParams: FindAllFilter): Promise<Model<ProductInterface>[] | string> => {
  try {
    const { limit, currentPage } = findParams;

    if(!currentPage) {
      return "Please, insert the currentPage value."
    }

    const allProducts: Model<ProductInterface>[] = await ProductEntity.findAll({
      limit: limit || 10,
      offset: (limit || 10) * (currentPage - 1),
    });

    return allProducts;

  } catch (error: any) {
    throw error;
  }
};

export const GetProductById = async (productId: string): Promise<Model<ProductInterface> | null> => {
    try{
      const Id: number = Number.parseInt(productId);
      const user: Model<ProductInterface> | null = await ProductEntity.findOne({ where: { Id } });
      
      return user;
  
    } catch (error) {
      throw error;
    };
};

export const GetProductByUniqueCode = async (UniqueCode: string): Promise<Model<ProductInterface> | null> => {
    try{
      const user: Model<ProductInterface> | null = await ProductEntity.findOne({ where: { UniqueCode } });
      
      return user;
  
    } catch (error) {
      throw error;
    };
};