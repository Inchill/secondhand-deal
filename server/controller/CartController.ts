const CartService = require('../service/CartService.ts');
const goodsService = require('../service/GoodsService.ts');

module.exports = {
    // 添加到购物车
    addToCart: async (ctx, next) => {
        await next();
        let uid = ctx.request.body.uid,
            gid = ctx.request.body.gid,
            count = ctx.request.body.count;
        let data = await CartService.addToCart(uid, gid, count);
        ctx.response.type = 'charset=utf-8';
        if(data) ctx.response.body = '200';
        else ctx.response.body = 'insert failed';
    },
    // 获取用户购物车 
    getUserCart: async (ctx, next) => {
        await next();
        let uid = ctx.params.uid;
        let data = await CartService.getUserCart(uid);
        let goodsList = [];
        // 再获取商品的图片、名称、单价以及库存
        for(let i = 0; i < data.length; i++) {
            let goods = data[i].dataValues;
            let goodsInfo = await goodsService.getGoodsById(goods.goods_id);
            // 如果该商品售罄，则不展示
            if(!goodsInfo.length) continue;
            let obj = {
                cart_id: goods.cart_id,
                goods_id: goods.goods_id,
                goods_image: goodsInfo[0].dataValues.goods_image,
                goods_name: goodsInfo[0].dataValues.goods_name,
                goods_price: goodsInfo[0].dataValues.goods_price,
                goods_count: goodsInfo[0].dataValues.count,
                cart_count: goods.count   
            }
            goodsList.push(obj);
        }
        ctx.response.type = 'charset=utf-8';
        ctx.response.body = goodsList;
    },
    // 修改购物车商品数量
    changeCartCount: async (ctx, next) => {
        await next();
        let cart_count = ctx.request.body.cart_count,
            goods_id = ctx.request.body.goods_id;
        let data = await CartService.changeCartCount(goods_id, cart_count);
        ctx.response.type = 'charset=utf-8';
        if(data) ctx.response.body = '200';
        else ctx.response.body = 'update failed';
    },
    // 删除商品
    delCartGoods: async (ctx, next) => {
        await next();
        let data = await CartService.delCartGoods(ctx.request.body.cart_id);
        ctx.response.type = 'charset=utf-8';
        if(data) ctx.response.body = '200';
        else ctx.response.body = 'delete failed';
    },
    // 支付后删除购物车
    emptyCart: async (ctx, next) => {
        await next();
        let goodsList = ctx.request.body.goodsList;
        for(var i = 0, len = goodsList.length; i < len; i++) {
            await CartService.delCartGoods(goodsList[i].cart_id);
        }
        ctx.response.type = 'charset=utf-8';
        ctx.response.body = 200;
    }
}