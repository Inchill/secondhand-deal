const addressModel = require('../model/AddressModel.ts');

module.exports = {
    // 插入一条地址记录
    insertAddress: async (uid, name, phone, address) => {
        return await addressModel.Address.create({
            user_id: uid,
            name: name,
            phone_num: phone,
            address: address
        })
    },
    // 根据用户id查询所有地址
    findAddressById: async (uid) => {
        return await addressModel.Address.findAll({
            where: {
                user_id: uid
            }
        })
    },
    // 删除一个地址
    delAddressById: async (address_id) => {
        return await addressModel.Address.destroy({
            where: {
                address_id: address_id
            }
        })
    },
    // 根据order_id查询地址
    findAddressByOrderId: async (address_id) => {
        return await addressModel.Address.findAll({
            where: {
                address_id: address_id
            }
        })
    }
}