import { DataType } from "sequelize-typescript";
import { UUIDV4 } from "sequelize";
import { DbInstance } from "../../../database/database";

export const ProductEntity = DbInstance.define("Product", {
  id: {
    type: DataType.UUID,
    allowNull: false,
    unique: true,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
      type: DataType.STRING(50),
      allowNull: false,
  },
  price: {
      type: DataType.FLOAT,
      allowNull: false,
  },
  description: {
      type: DataType.STRING(500),
  }
});