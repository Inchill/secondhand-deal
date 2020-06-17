const db = require('../config/db.ts');

const Category = db.sequelize.define('category', {
    category_id: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'category_id'
    },
    goods_type: {
        type: db.DataTypes.STRING,
        allowNull: false,
        field: 'goods_type'
    }
}, {
    tableName: 'category_table',
    tamestamps: false
});

module.exports = {
    Category
}