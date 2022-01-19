import { DataType } from "sequelize-typescript";
import { UUIDV4 } from "sequelize";
import { DbInstance } from "../../../database/database";
import { UserEntity } from "../../user/entities/User.entity";

export const OrderEntity = DbInstance.define(
  "Order",
  {
    id: {
      type: DataType.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    userId: {
        type: DataType.UUID,
        allowNull: false,
    },
    totalPrice: {
      type: DataType.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    //TODO: Essa relação depende da tabela "products"
    productsId: {
      type: DataType.UUID,
      allowNull: false,
    }
  },
  {
      timestamps: true,
      underscored: true,
  }
);

OrderEntity.belongsTo(UserEntity, { foreignKey: "userId" });
