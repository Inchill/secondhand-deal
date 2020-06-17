const db = require('../config/db.ts');

const Feedback = db.sequelize.define('feedback', {
    feedback_id: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'feedback_id'
    },
    user_id: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    content: {
        type: db.DataTypes.TEXT('tiny'),
        allowNull: false,
        field: 'content'
    }
}, {
    tableName: 'feedback_table'
});

module.exports = {
    Feedback
}