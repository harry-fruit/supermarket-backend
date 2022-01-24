import { DataType } from "sequelize-typescript";
import { DbInstance } from "../../../database/database";

export const UserEntity = DbInstance.define(
  "User",
  {
    id: {
      type: DataType.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataType.STRING(100),
      allowNull: false,
    },
    lastName: {
      type: DataType.STRING(100),
      allowNull: false,
    },
    age: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    rg: {
      type: DataType.STRING(50),
      allowNull: false,
    },
    phone: {
      type: DataType.STRING(50),
      allowNull: true,
    },
    email: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataType.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
