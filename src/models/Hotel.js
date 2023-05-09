import { sequelize } from '../database/database';
import { DataTypes } from 'sequelize';
import { City } from "./City";
import { HotelMedia } from './HotelMedia';

export const Hotel = sequelize.define('Hotel', {
    Cod: {
       type: DataTypes.STRING(200),
       autoIncrement: true,
       primaryKey: true
    },
    Name: {
       type: DataTypes.INTEGER,
       references: {
          model:'Role',
          key:'Id'
       }
    },
    Description: {
       type: DataTypes.INTEGER,
    },
    IdCity: {
       type: DataTypes.STRING,
       references:{
        model:'City',
        key:'Id'
     }
    },
    Ubication: {
       type: DataTypes.STRING,
    },
    Address: {
       type: DataTypes.STRING,
       allowNull: false,
    }
 });

 Hotel.belongsTo(City,{
    foreignKey:'IdCity'
 });

 Hotel.hasMany(HotelMedia, { 
   as : 'Medias',
   foreignKey : 'CodHotel' 
});