import { DbInstance } from "../../../database/database";
import { DataType } from "sequelize-typescript";
import { OrderEntity } from "./Order.entity";
import { ProductEntity } from "../../product/entities/Product.entity";

export const OrderProductRelationship = DbInstance.define(
    'OrderProductRelationship', 
    {
        id: {
            type: DataType.NUMBER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
        },
        orderId: {
            type: DataType.NUMBER,
            allowNull: false,
        },
        productId: {
            type: DataType.NUMBER,
            allowNull: false,
        }
    },
    {
        timestamps: true,
    }
);


OrderProductRelationship.belongsTo(OrderEntity, { foreignKey: "orderId" });
OrderProductRelationship.belongsTo(ProductEntity, { foreignKey: "productId" });