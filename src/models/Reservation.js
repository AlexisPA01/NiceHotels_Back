import { sequelize } from "../database/database";
import { DataTypes } from "sequelize";

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
    },Total: {
        type: DataTypes.FLOAT
    }
});