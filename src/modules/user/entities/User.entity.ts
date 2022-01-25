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
      type: DataType.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataType.STRING(50),
      allowNull: false,
    },
    age: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataType.CHAR(1),
      allowNull: false,
    },
    address: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    cpf: {
      type: DataType.STRING(50),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataType.STRING(50),
      allowNull: true,
    },
    email: {
      unique: true,
      type: DataType.STRING(150),
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
