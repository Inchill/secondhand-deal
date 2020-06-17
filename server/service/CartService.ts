const cartModel = require('../model/CartModel.ts');

module.exports = {
    // 添加到购物车
    addToCart: async (uid, gid, count) => {
        return await cartModel.Cart.create({
            user_id: uid,
            goods_id: gid,
            count
        })
    },
    // 获取用户购物车
    getUserCart: async (uid) => {
        return await cartModel.Cart.findAll({
            where: {
                user_id: uid
            }
        })
    },
    // 修改购物车商品数量
    changeCartCount: async (gid, count) => {
        return await cartModel.Cart.update({
            count: count
        }, {
            where: {
                goods_id: gid
            }
        })
    },
    // 删除商品
    delCartGoods: async (cart_id) => {
        return await cartModel.Cart.destroy({
            where: {
                cart_id: cart_id
            }
        })
    },
    // 根据user_id和goods_id删除
    delCart: async (user_id, goods_id) => {
        return await cartModel.Cart.destroy({
            where: {
                user_id: user_id,
                goods_id: goods_id
            }
        })
    }
}