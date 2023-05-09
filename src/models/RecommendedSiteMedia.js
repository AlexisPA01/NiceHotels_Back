import { sequelize } from '../database/database';
import { DataTypes } from 'sequelize';

export const RecommendedSiteMedia = sequelize.define('RecommendedSiteMedia', {
    Id: {
       type: DataTypes.INTEGER,
       autoIncrement: true,
       primaryKey: true
    },
    IdRecommendedSite: {
       type: DataTypes.INTEGER,
       references: {
          model:'RecommendedSite',
          key:'Id'
       }
    },
    Name: {
       type: DataTypes.STRING(250)
    },
    URL: {
       type: DataTypes.STRING(500)
    },
    FileType: {
       type: DataTypes.STRING(250)
    }
 });