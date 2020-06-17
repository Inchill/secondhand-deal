const imageModel = require('../model/ImageModel.ts');

module.exports = {
    // 批量插入
    insertImages: async (images) => {
        return await imageModel.Image.bulkCreate(images);
    },
    findImages: async (goods_id) => {
        return await imageModel.Image.findAll({
            where: {
                goods_id: goods_id
            }
        })
    }
}