import { DataType } from "sequelize-typescript";
import { DbInstance } from "../../../database/database";
import { UserEntity } from "../../user/entities/User.entity";

export const OrderEntity = DbInstance.define(
  "Order",
  {
    id: {
      type: DataType.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
        type: DataType.INTEGER,
        allowNull: false,
    },
    totalPrice: {
      type: DataType.DOUBLE,
      allowNull: false,
      defaultValue: 0.1,
    },
    // productsId: {
    //   type: DataType.INTEGER,
    //   allowNull: false,
    // }
  },
  {
      timestamps: true,
  }
);

OrderEntity.belongsTo(UserEntity, { foreignKey: "userId" });
