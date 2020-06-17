const orderModel = require('../model/OrderModel.ts');

module.exports = {
    // 可批量插入订单记录
    insertOrder: async (orders) => {
        return await orderModel.Order.bulkCreate(orders);
    },
    // 查询用户订单(买方)
    findUserOrders: async (uid) => {
        return await orderModel.Order.findAll({
            where: {
                buyer_id: uid
            }
        })
    },
    // 查询卖方订单
    findPublisherOrders: async (uid) => {
        return await orderModel.Order.findAll({
            where: {
                seller_id: uid
            }
        })
    },
    // 设置订单为已完成
    setOrderStatus: async (order_id) => {
        return await orderModel.Order.update({
            order_status: 2
        }, {
            where: {
                order_id: order_id
            }
        })
    }
}