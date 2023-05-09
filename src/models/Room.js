import { sequelize } from "../database/database";
import { DataTypes } from "sequelize";
import { Hotel } from "./Hotel";
import { RoomMedia } from "./RoomMedia";

export const Room = sequelize.define('Room', {
    Cod: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    CodHotel: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Hotel',
            key: 'Cod'
        }
    },
    Name: {
        type: DataTypes.STRING(100)
    },
    Description: {
        type: DataTypes.STRING(1000)
    },
    CostNight: {
        type: DataTypes.FLOAT
    }
});

Room.belongsTo(Hotel, {
    foreignKey: 'CodHotel'
});

Room.hasMany(RoomMedia, {
    as : 'Medias',
    foreignKey : 'CodRoom'
});