import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

export const DocumentType = sequelize.define("DocumentType", {
   Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   Name: {
      type: DataTypes.STRING(250),
   },
});
