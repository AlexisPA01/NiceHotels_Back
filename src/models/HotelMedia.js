import { sequelize } from '../database/database';
import { DataTypes } from 'sequelize';

export const HotelMedia = sequelize.define('HotelMedia', {
    Id: {
       type: DataTypes.INTEGER,
       autoIncrement: true,
       primaryKey: true
    },
    CodHotel: {
       type: DataTypes.STRING(200),
       references: {
          model:'Hotel',
          key:'Cod'
       }
    },
    Name: {
       type: DataTypes.STRING
    },
    URL: {
       type: DataTypes.STRING
    },
    FileType: {
       type: DataTypes.STRING
    }
 });
