const db = require('../config/db.ts');  // 引入db.ts文件模块

const Goods = db.sequelize.define('goods', {
    goods_id: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'goods_id'
    },
    user_id: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    goods_name: {
        type: db.DataTypes.STRING,
        allowNull: false,
        field: 'goods_name'
    },
    category_id: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
        field: 'category_id'
    },
    goods_desc: {
        type: db.DataTypes.STRING,
        allowNull: false,
        field: 'goods_desc'
    },
    goods_image: {
        type: db.DataTypes.STRING,
        allowNull: false,
        field: 'goods_image'
    },
    goods_price: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
        field: 'goods_price'
    },
    count: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
        field: 'count'
    }
}, {
    tableName: 'goods_table',
    timestamps: false
});

module.exports = {
    Goods
}