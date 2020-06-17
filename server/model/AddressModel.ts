const db = require('../config/db.ts');

const Address = db.sequelize.define('address', {
    address_id: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'address_id'
    },
    user_id: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    name: {
        type: db.DataTypes.STRING,
        allowNull: false,
        field: 'name'
    },
    phone_num: {
        type: db.DataTypes.STRING,
        allowNull: false,
        field: 'phone_num'
    },
    address: {
        type: db.DataTypes.STRING,
        allowNull: false,
        field: 'address'
    }
}, {
    tableName: 'address_table',
    timestamps: false
});

module.exports = {
    Address
}