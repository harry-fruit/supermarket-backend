import { DataType } from "sequelize-typescript";
import { UUIDV4 } from "sequelize";
import { DbInstance } from "../../../database/database";

export const ProductEntity = DbInstance.define("Product", {
  Id: {
    type: DataType.UUID,
    allowNull: false,
    unique: true,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  Name: {
      type: DataType.STRING(70),
      allowNull: false,
  },
  UniqueCode: {
      type: DataType.STRING(70),
      allowNull: false,
  },
  Price: {
      type: DataType.FLOAT,
      allowNull: false,
  },
  Description: {
      type: DataType.STRING(500),
  },
  Stock: {
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});