import { Model } from "sequelize/dist";
import { ProductEntity } from "../entities/Product.entity";
import { ProductInterface } from "../interfaces/Product.interface";

export const createProduct = async (payload: ProductInterface): Promise<Model<ProductInterface>> => {
    try {
        const product: Model<ProductInterface> = await ProductEntity.create({ ...payload });
        
        return product;

    } catch(error) {
        throw error;
    };
};