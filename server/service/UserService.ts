const userModel = require('../model/UserModel.ts');

// 数据访问服务
module.exports = {
    getAllUsers: async () => {
        return await userModel.User.findAll();
    },
    // 查询用户
    getUserByPhone: async (phone) => {
        return await userModel.User.findAll({
            where: {
                phone_num: phone
            }
        });
    },
    // 插入一条用户记录
    insertUser: async (phone, password) => {
        return await userModel.User.create({
            phone_num: phone,
            password: password
        })
    },
    // 根据id查询用户
    findUser: async (uid) => {
        return await userModel.User.findAll({
            where: {
                user_id: uid
            }
        })
    },
    // 修改用户密码
    updatePass: async (uid, pass) => {
        return await userModel.User.update({ password: pass }, {
            where: {
                user_id: uid
            }
        });
    }
};