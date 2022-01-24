import { Model } from "sequelize/dist";
import { HttpResponse } from "../../../utils/HttpResponse";
import { FindAllFilter } from "../../../utils/types/FindAllFilter.type";
import { ProductEntity } from "../entities/Product.entity";
import { ProductInterface } from "../interfaces/Product.interface";

export const getAllProducts = async (findParams: FindAllFilter): Promise<Model<ProductInterface>[]> => {
    try {
      const { limit, currentPage } = findParams;
  
          const allProducts = await ProductEntity.findAll({
              limit: limit || 10,
              offset: (limit || 10) * (currentPage - 1)
          });
          
          return allProducts;
      } catch(error: any) {
          throw HttpResponse('Internal Server Error', 500, error);
      }
  }
  
  export const getProduct = async (rg: string): Promise<Model<ProductInterface>> => {
  
      const product: Model<ProductInterface> | null = await ProductEntity.findOne({ where: { rg } });
  
      if (!product){
        throw "Product doesn't exist";
      };
  
      return product;
  };