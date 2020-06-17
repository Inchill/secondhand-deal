const db = require('../config/db.ts');

const Order = db.sequelize.define('order', {
    order_id: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'order_id'
    },
    goods_id: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
        field: 'goods_id'
    },
    buyer_id: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
        field: 'buyer_id'
    },
    seller_id: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
        field: 'seller_id'
    },
    order_status: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
        field: 'order_status'
    },
    count: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
        field: 'count'
    },
    total_amount: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
        field: 'total_amount'
    },
    address_id: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
        field: 'address_id'
    },
    goods_image: {
        type: db.DataTypes.STRING,
        allowNull: false,
        field: 'goods_image'
    },
    goods_name: {
        type: db.DataTypes.STRING,
        allowNull: false,
        field: 'goods_name'
    }
}, {
    tableName: 'order_table'
});

module.exports = {
    Order
}