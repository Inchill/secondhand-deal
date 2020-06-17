const Sequelize = require('sequelize');
const sequelize = new Sequelize('trading_system', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('connected');
}).catch(err => {
    console.error('connect failed:' + err);
});

const Op = Sequelize.Op;
const DataTypes = Sequelize.DataTypes;

module.exports = {
    sequelize,
    Op,
    DataTypes
};