import { sequelize } from "../database/database";
import { DataTypes } from "sequelize";

export const RoomMedia = sequelize.define('RoomMedia', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    CodRoom: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Room',
            key: 'Cod'
        }
    },
    Name: {
        type: DataTypes.STRING(100)
    },
    URL: {
        type: DataTypes.STRING
    },
    FileType: {
        type: DataTypes.STRING
    }
});