import { sequelize } from "../database/database";
import { DataTypes } from "sequelize";
import { Room } from "./Room";

export const RoomNumber = sequelize.define('RoomNumber', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Num: {
        type: DataTypes.INTEGER,
    },
    CodRoom: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Room',
            key: 'Cod'
        }
    },
    IsAvailable: {
        type: DataTypes.TINYINT
    }
});

RoomNumber.belongsTo(Room, {
    foreignKey: 'CodRoom'
});