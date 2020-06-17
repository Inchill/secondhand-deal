const db = require('../config/db.ts');

const Image = db.sequelize.define('image', {
    image_id: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'image_id'
    },
    goods_id: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
        field: 'goods_id'
    },
    image_url: {
        type: db.DataTypes.STRING,
        allowNull: false,
        field: 'image_url'
    }
}, {
    tableName: 'image_table',
    timestamps: false
});

module.exports = {
    Image
}