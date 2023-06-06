import { sequelize } from "../database/database";
import { DataTypes } from "sequelize";

import { Guest } from "./Guest";
import { Room } from "./Room";

export const Reservation = sequelize.define('Reservation', {
    Num: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    StartDate: {
        type: DataTypes.DATE
    },
    EndDate: {
        type: DataTypes.DATE
    },
    TotalAdults: {
        type: DataTypes.SMALLINT
    },
    TotalKids: {
        type: DataTypes.SMALLINT
    },
    TotalBabys: {
        type: DataTypes.SMALLINT
    },
    NumberNights: {
        type: DataTypes.SMALLINT
    },
    SubTotal: {
        type: DataTypes.FLOAT
    }, Total: {
        type: DataTypes.FLOAT
    },
    IdRoom: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Room',
            key: 'Cod'
        }
    },
    IdGuest: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Guest',
            key: 'Id'
        }
    },
});

Reservation.belongsTo(Room, {
    foreignKey: 'IdRoom'
});

Reservation.belongsTo(Guest, {
    foreignKey: 'IdGuest'
});