import { sequelize } from "../database/database";
import { DataTypes } from "sequelize";
import { Installation } from "./Installation";

export const InstallationMedia = sequelize.define('InstallationMedia', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    IdInstallation: {
        type: DataTypes.INTEGER,
        references:{
            model: 'Installation',
            key: 'Id'
        }
    },
    Name: {
        type: DataTypes.STRING(250)
    },
    URL: {
        type: DataTypes.STRING(500)
    },
    FileType: {
        type: DataTypes.STRING(250)
    },
    TypeMedia: {
        type: DataTypes.STRING(250)
    }
});