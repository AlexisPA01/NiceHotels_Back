import { sequelize } from '../database/database'
import { DataTypes } from 'sequelize';

export const City = sequelize.define('City', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    Name: {
        type: DataTypes.STRING(250),
    }
    });