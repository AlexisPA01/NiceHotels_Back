import { sequelize } from "../database/database";
import { DataTypes } from "sequelize";
import { Reservation } from "./Reservation";
import { RoomNumber } from "./RoomNumber";
import { Guest } from "./Guest";

export const GuestRoomReservated = sequelize.define('GuestRoomReservated', {
    IdRoomReservated: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'RoomReservated',
            key: 'Id'
        }
    },
    IdGuest: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Guest',
            key: 'Id'
        }
    },
    IsResponsibleRoom: {
        type: DataTypes.BOOLEAN
    }
});

GuestRoomReservated.belongsTo(Guest,{
    foreignKey:'IdGuest'
});