import mysql from "mysql2/promise";
import config from "../config";
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host:config.host,
    dialect: 'mysql',
    dialectOptions: {
        connectTimeout: 60000 
    },
    define: {
        freezeTableName: true,
        timestamps:false
    },
    pool:{ 
        max: 2, 
        min: 0, 
        acquire: 20000, 
        idle: 3000, 
        evict: 1500, 
    },
    retry: { 
        max: 5, 
        backoffBase: 1000,
        Default: 100,
        Exponent: 1.5,
        Default: 1.1
    }
  });

const getConnection =()=>
{
    return connection;
}

export {sequelize}