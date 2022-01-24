import { Model } from "sequelize/dist";
import { FindAllFilter } from "../../../utils/interfaces/FindAllFilter.interface";
import { OrderEntity } from "../entities/Order.entity"
import { OrderInterface } from "../interfaces/Order.interface";

export const getOrderById = async (id: number): Promise<Model<OrderInterface>> => {
    try {
        const exists: Model<OrderInterface> | null = await OrderEntity.findOne({ where: { id } });
    
        if (!exists) {
            throw new Error("Order doesn't exist.");
        };
    
        return exists;
    } catch (error) {
        throw error;
    };
};

export const getOrders = async (findParams: FindAllFilter) => {
    try {
        const { limit, currentPage } = findParams; 

        const allUsers = await OrderEntity.findAll({
            limit: limit || 10,
            offset: (limit || 10) * (currentPage - 1)
        });
        
        return allUsers;
    } catch(error: any) {
        throw error;
    };
};
