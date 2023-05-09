import { sequelize } from "../database/database";
import { DataTypes } from "sequelize";
import { Hotel } from "./Hotel";
import { InstallationMedia } from "./InstallationMedia";

export const Installation = sequelize.define('Installation', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    CodHotel: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Hotel',
            Key: 'Cod'
        }
    },
    Name: {
        type: DataTypes.STRING(250)
    },
    Description: {
        type: DataTypes.STRING(500)
    },
    Schedule: {
        type: DataTypes.STRING(250)
    },
    DressCode: {
        type: DataTypes.STRING(250)
    }   
});

Installation.belongsTo(Hotel, {
    foreignKey: 'CodHotel'
});

Installation.hasMany(InstallationMedia, {
    as : 'Medias',
    foreignKey: 'IdInstallation'
});