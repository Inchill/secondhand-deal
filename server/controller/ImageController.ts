const ImageService = require('../service/ImageService.ts');

module.exports = {
    // 上传辅图
    uploadImages: async (ctx, next) => {
        await next();
        let imageUrls = ctx.request.body.imageUrls,
            goods_id = ctx.request.body.goods_id;
        let images = [];
        for(var i = 0; i < imageUrls.length; i++) {
            let obj = {
                goods_id: goods_id,
                image_url: imageUrls[i]
            };
            images.push(obj);
        }
        let data = await ImageService.insertImages(images);
        ctx.response.type = 'utf-8';
        ctx.response.body = data;
    },
    // 根据goods_id查询辅图
    getImages: async (ctx, next) => {
        await next();
        let goods_id = Number(ctx.params.gid);
        let data = await ImageService.findImages(goods_id);
        ctx.response.type = 'utf-8';
        ctx.response.body = data;
    }
}