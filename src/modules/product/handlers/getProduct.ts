import { Model } from "sequelize/dist";
import { ProductEntity } from "../entities/Product.entity";
import { ProductInterface } from "../interfaces/Product.interface";

export const GetProductById = async (searchKey: string): Promise<Model<ProductInterface> | null> => {
    try{
      const user: Model<ProductInterface> | null = await ProductEntity.findOne({ where: { Cpf } });
      
      return user;
  
    } catch (error) {
      throw error;
    };
  };