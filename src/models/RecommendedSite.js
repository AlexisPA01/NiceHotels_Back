import { sequelize } from "../database/database";
import { DataTypes } from "sequelize";
import { Hotel } from "./Hotel";
import { RecommendedSiteMedia } from "./RecommendedSiteMedia";

export const RecommendedSite = sequelize.define('RecommendedSite', {
    Id: {
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
        type: DataTypes.STRING(2000)
    },
    Address: {
        type: DataTypes.STRING(100)
    },
    Ubication: {
        type: DataTypes.STRING(200)
    }
});

RecommendedSite.belongsTo(Hotel, {
    foreignKey: 'CodHotel'
});

RecommendedSite.hasMany(RecommendedSiteMedia, { 
    as : 'Medias',
    foreignKey : 'IdRecommendedSite' 
 });