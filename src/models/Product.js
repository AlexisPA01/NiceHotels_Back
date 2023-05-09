import { sequelize } from "../database/database";
import { DataTypes } from "sequelize";
import { Installation } from './Installation'

export const Product = sequelize.define('Product', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    IdInstallation: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Installation',
            key: 'Id'
        },
    },
    Name: {
        type: DataTypes.STRING(250)
    },
    Description: {
        type: DataTypes.STRING(500)
    },
    Cost: {
        type: DataTypes.FLOAT
    },
    IsRoomService: {
        type: DataTypes.TINYINT
    }
});

Product.belongsTo(Installation, {
    foreignKey: 'IdInstallation'
});