import Sequelize from "sequelize";
const { DataTypes } = Sequelize;
import { sequelize } from "../config/database.js";

export const ProfileModel = sequelize.define(
  "profile",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { paranoid: true },
);
