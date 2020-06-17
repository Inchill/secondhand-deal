const GoodsService = require('../service/GoodsService.ts');

module.exports = {
    // 获取所有商品
    getAllGoods: async (ctx, next) => {
        await next();
        let data = await GoodsService.getAllGoods();
        ctx.response.type = 'charset=utf-8';
        ctx.response.body = JSON.stringify(data);
    },
    // 发布商品信息
    publishGoods: async (ctx, next) => {
        await next();
        let form = ctx.request.body.form,
            uid = ctx.request.body.uid;
        let data = await GoodsService.publishGoods(form.name, form.categoryId, form.price, form.num, form.desc, form.imageUrl, uid);
        ctx.response.type = 'utf-8';
        ctx.response.body = data;
    },
    // 根据关键字搜索商品
    searchGoods: async (ctx, next) => {
        await next();
        let data = await GoodsService.searchGoods(ctx.request.query.keyword);
        ctx.response.type = 'charset=utf-8';
        ctx.response.body = JSON.stringify(data);
    },
    // 根据种类筛选商品
    getGoodsByCategory: async (ctx, next) => {
        await next();
        let data = await GoodsService.getCategoryById(ctx.params.id);
        ctx.response.type = 'charset=utf-8';
        ctx.response.body = JSON.stringify(data);
    },
    // 分页显示商品
    getGoodsByPage: async (ctx, next) => {
        await next();
        let currentPage = Number(ctx.request.query.currentPage),
            pageSize = Number(ctx.request.query.pageSize);
        let data = await GoodsService.getGoodsByPage(currentPage, pageSize);
        ctx.response.type = 'charset=utf-8';
        ctx.response.body = JSON.stringify(data);
    },
    // 根据商品id查询商品
    getGoodsById: async (ctx, next) => {
        await next();
        let data = await GoodsService.getGoodsById(ctx.params.id);
        ctx.response.type = 'charset=utf-8';
        ctx.response.body = JSON.stringify(data);
    },
    // 推荐商品
    getRecommendGoods: async (ctx, next) => {
        await next();
        let data = await GoodsService.getRecommendGoods();
        ctx.response.type = 'charset=utf-8';
        ctx.response.body = JSON.stringify(data);
    }
}