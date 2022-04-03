import { DataType } from "sequelize-typescript";
import { DbInstance } from "../../../database/database";

export const UserEntity = DbInstance.define(
  "User",
  {
    Id: {
      type: DataType.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    FirstName: {
      type: DataType.STRING(50),
      allowNull: false,
    },
    LastName: {
      type: DataType.STRING(50),
      allowNull: false,
    },
    Age: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    Gender: {
      type: DataType.CHAR(3),
      allowNull: false,
    },
    Address: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    Cpf: {
      type: DataType.STRING(50),
      allowNull: false,
      unique: true,
    },
    Phone: {
      type: DataType.STRING(50),
      allowNull: true,
      unique: true,
    },
    Email: {
      unique: true,
      type: DataType.STRING(100),
      allowNull: false,
    },
    Password: {
      type: DataType.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
