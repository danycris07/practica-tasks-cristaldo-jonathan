import Sequelize from "sequelize";
const { DataTypes } = Sequelize;
import { sequelize } from "../config/database.js";

export const TagModel = sequelize.define(
  "tag",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { paranoid: true },
);
