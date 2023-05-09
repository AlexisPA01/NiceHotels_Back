import { sequelize } from "../database/database";
import { DataTypes } from "sequelize";
import { RoomReservated } from "./RoomReservated";

export const RoomService = sequelize.define('RoomService', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    IdRoomReservated: {
        type: DataTypes.INTEGER,
        references: {
            model: 'RoomReservated',
            key: 'Id',
        }
    },
    DateRoomService: {
        type: DataTypes.DATE
    },
    SubTotal: {
        type: DataTypes.FLOAT 
    },
    Total: {
        type: DataTypes.FLOAT 
    },
});

RoomService.belongsTo(RoomReservated, {
    foreignKey: 'IdRoomReservated'
});