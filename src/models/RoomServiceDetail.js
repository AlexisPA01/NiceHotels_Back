import { sequelize } from '../database/database';
import { DataTypes } from 'sequelize';
import { Product } from './Product'
import { RoomService } from './RoomService'

export const RoomServiceDetail = sequelize.define('RoomServiceDetail', {
    IdProduct: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Product',
            key: 'Id'
        }
    },
    IdRoomService: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'RoomService',
            key: 'Id'
        }
    },
    Quantity: {
        type: DataTypes.SMALLINT
    },
    Observations: {
        type: DataTypes.STRING(250)
    },
    Taxes: {
        type: DataTypes.FLOAT
    },
    Total: {
        type: DataTypes.FLOAT
    }

});

RoomServiceDetail.belongsTo(Product, {
foreignKey: 'IdProduct'
});