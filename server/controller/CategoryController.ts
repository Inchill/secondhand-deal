const CategoryService = require('../service/CategoryService.ts');

module.exports = {
    // 获取商品种类
    getCategory: async (ctx, next) => {
        await next();
        let data = await CategoryService.getCategory();
        ctx.response.type = 'charset=utf-8';
        ctx.response.body = JSON.stringify(data);
    }
}