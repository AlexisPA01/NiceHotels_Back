import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { DocumentType } from "./DocumentType";
import { City } from "./City";

export const Guest = sequelize.define("Guest", {
   Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   Name: {
      type: DataTypes.STRING(250),
   },
   LastName: {
      type: DataTypes.STRING(250),
   },
   Document: {
      type: DataTypes.STRING(250),
   },
   IdDocumentType: {
      type: DataTypes.INTEGER,
      references:{
         model:'DocumentType',
         key:'Id'
      }
   },
   DateBirth: {
      type: DataTypes.DATE,
   },
   Gender: {
      type: DataTypes.STRING(100),
   },
   PhoneNumber: {
      type: DataTypes.STRING(100),
   },
   Email: {
      type: DataTypes.STRING(250),
   },
});

Guest.belongsTo(DocumentType, {
   foreignKey: "IdDocumentType",
});
Guest.belongsTo(City, {
   foreignKey: "IdCity",
});
