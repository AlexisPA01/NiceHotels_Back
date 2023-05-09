import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Hotel } from "./Hotel";
import { Installation } from "./Installation";

export const Service = sequelize.define("Service", {
   Id: {
      type: DataTypes.INTEGER(250),
      primaryKey: true,
      autoIncrement: true,
   },

   IdInstallation: {
      type: DataTypes.INTEGER,
      references: {
         model: "Installation",
         key: "Id",
      },
   },

   CodHotel: {
      type: DataTypes.INTEGER,
      references: {
         model: "Hotel",
         key: "Cod",
      },
   },

   IdServiceCategory: {
      type: DataTypes.INTEGER,
      references: {
         model: "ServiceCategory",
         key: "Id",
      },
   },

   Name: {
      type: DataTypes.STRING(250),
   },
   Description: {
      type: DataTypes.STRING(500),
   },

   Cost: {
      type: DataTypes.FLOAT,
   },

   IsRoomService: {
      type: DataTypes.BOOLEAN,
   },
});

Service.belongsTo(Installation, {
   foreignKey: "IdInstallation",
});

Service.belongsTo(Hotel, {
   foreignKey: "CodHotel",
});