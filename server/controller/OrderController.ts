const OrderService = require('../service/OrderService.ts');
const GoodsService = require('../service/GoodsService.ts');

module.exports = {
    // 添加订单
    addOrder: async (ctx, next) => {
        await next();
        let orderList = ctx.request.body.orderList,
            buyer_id = Number(ctx.request.body.buyer_id),
            address_id = Number(ctx.request.body.address_id);
        // 根据goods_id查询seller_id，构造订单数组
        let orders = [];
        for(var i = 0, len = orderList.length; i < len; i++) {
            let goods_id = orderList[i].goods_id;
            let data = await GoodsService.getGoodsById(goods_id);
            let seller_id = data[0].dataValues.user_id;
            let order = {
                goods_id: goods_id,
                buyer_id: buyer_id,
                seller_id: seller_id,
                order_status: 1,
                count: orderList[i].count,
                address_id: address_id,
                total_amount: orderList[i].count * orderList[i].goods_price,
                goods_image: orderList[i].goods_image,
                goods_name: orderList[i].goods_name 
            };
            orders.push(order);
            // 更改商品数量 
            let remainingCount = data[0].dataValues.count - orderList[i].count;
            await GoodsService.updateGoodsCount(goods_id, remainingCount);
        }
        let data = await OrderService.insertOrder(orders);
        ctx.response.type = 'utf-8';
        if(data) ctx.response.body = 200;
        else ctx.response.body = 'insert failed';
    },
    // 获取订单
    getOrder: async (ctx, next) => {
        await next();
        let uid = ctx.params.uid;
        let data = await OrderService.findUserOrders(uid);
        ctx.response.type = 'utf-8';
        ctx.response.body = data;
    },
    // 获取发布者成交订单
    getPublisherOrder: async (ctx, next) => {
        await next();
        let uid = ctx.params.uid;
        let data = await OrderService.findPublisherOrders(uid);
        ctx.response.type = 'utf-8';
        ctx.response.body = data;
    },
    // 确认收货
    confirmReceipt: async (ctx, next) => {
        await next();
        let order_id = ctx.request.body.order_id;
        let data = OrderService.setOrderStatus(order_id);
        ctx.response.type = 'utf-8';
        if(data) ctx.response.body = 200;
        else ctx.response.body = 'update failed';
    }
}