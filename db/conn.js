const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PWD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        timezone: '-03:00',

        logging: console.log,
        // logging: false,
        dialectOptions: {
            // useUTC: false, //for reading from database
            dateStrings: true,
            typeCast: function (field, next) {
                // for reading from database
                if (field.type === 'DATETIME') {
                    return field.string();
                }
                return next();
            },
        },
        define: {
            timestamps: true,
            freezeTableName: true,
        },
    }
);

module.exports = sequelize;
