const goodsModel = require('../model/GoodsModel.ts');
const db = require('../config/db.ts');

module.exports = {
    // 访问所有商品数据
    getAllGoods: async () => {
        return await goodsModel.Goods.findAll();
    },
    // 存储商品信息
    publishGoods: async (name, categoryId, price, count, desc, imageUrl, uid) => {
        return await goodsModel.Goods.create({
            goods_name: name,
            goods_price: price,
            count: count,
            goods_desc: desc,
            goods_image: imageUrl,
            category_id: categoryId,
            user_id: uid
        });
    },
    // 搜索商品(含名字和描述)
    searchGoods: async (keyword) => {
        return await goodsModel.Goods.findAll({
            where: {
                [db.Op.or]: [
                    {
                        goods_name: {
                            [db.Op.like]: '%' + keyword + '%'
                        }
                    },
                    {
                        goods_desc: {
                            [db.Op.like]: '%' + keyword + '%'
                        }
                    }
                ]
            }
        })
    },
    // 分页显示商品
    getGoodsByPage: async (currentPage, pageSize) => {
        let offset = (currentPage - 1) * pageSize;
        return await goodsModel.Goods.findAll({
            offset,
            limit: pageSize
        })
    },
    // 根据商品id查询
    getGoodsById: async (goods_id) => {
        return await goodsModel.Goods.findAll({
            where: {
                goods_id: goods_id
            }
        })
    },
    // 根据category_id查询商品
    getCategoryById: async (categoryId) => {
        return await goodsModel.Goods.findAll({
            where: {
                category_id: categoryId
            }
        })
    },
    // 获取推荐商品
    getRecommendGoods: async () => {
        // 查询总数
        let data = await goodsModel.Goods.findAll();
        let sum = data.length;
        let ran = Math.floor(Math.random() * sum);
        // order顺序必须依赖于某个属性
        return await goodsModel.Goods.findAll({
            offset: ran,
            limit: 40
        })
    },
    // 更改商品数量
    updateGoodsCount: async (goods_id, count) => {
        if(count) {
            return await goodsModel.Goods.update({
                count: count
            }, {
                where: {
                    goods_id: goods_id
                }
            })
        } else {    // 商品已售罄
            return await goodsModel.Goods.destroy({
                where: {
                    goods_id: goods_id
                }
            })
        }
    }
}