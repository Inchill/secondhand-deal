const db = require('../config/db.ts');  // 引入db.ts文件模块

const User = db.sequelize.define('user', {
    user_id: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'user_id'
    },
    password: {
        type: db.DataTypes.STRING,
        allowNull: false,
        field: 'password'
    },
    phone_num: {
        type: db.DataTypes.STRING,
        allowNull: false,
        field: 'phone_num'
    }
}, {
    timestamps: false,
    tableName: 'user_table'
});

module.exports = {
    User
}