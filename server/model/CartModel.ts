const db = require('../config/db.ts');  // 引入db.ts文件模块

const Cart = db.sequelize.define('cart', {
    cart_id: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'cart_id'
    },
    user_id: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    goods_id: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
        field: 'goods_id'
    },
    count: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
        field: 'count'
    }
}, {
    timestamps: false,
    tableName: 'cart_table'
});

module.exports = {
    Cart
}