import { sequelize } from "../database/database";
import { DataTypes } from "sequelize";
import { Reservation } from "./Reservation";
import { RoomNumber } from "./RoomNumber";
import { GuestRoomReservated } from "./GuestRoomReservated";

export const RoomReservated = sequelize.define('RoomReservated', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NumReservation: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Reservation',
            key: 'Num'
        }
    },
    IdRoomNumber: {
        type: DataTypes.INTEGER,
        references: {
            model: 'RoomNumber',
            key: 'Id'
        }
    },
    NumberAdults: {
        type: DataTypes.TINYINT
    },
    NumberKids: {
        type: DataTypes.TINYINT
    },
    NumberBabys: {
        type: DataTypes.TINYINT
    }
});

RoomReservated.belongsTo(Reservation, {
foreignKey: 'NumReservation'
});
RoomReservated.belongsTo(RoomNumber, {
foreignKey: 'IdRoomNumber'
});
RoomReservated.hasOne(GuestRoomReservated,{
    foreignKey:'IdRoomReservated'
});