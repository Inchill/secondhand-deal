const AddressService = require('../service/AddressService.ts');

module.exports = {
    addAddress: async (ctx, next) => {
        await next();
        let uid = ctx.request.body.uid,
            name = ctx.request.body.form.name,
            phone = ctx.request.body.form.phone,
            address = ctx.request.body.form.address;
        let data = await AddressService.insertAddress(uid, name, phone, address);
        ctx.response.type = 'utf-8';
        if(data) ctx.response.body = 200;
        else ctx.response.body = 'insert failed';
    },
    // 获取用户地址
    getAddress: async (ctx, next) => {
        await next();
        let uid = ctx.params.uid;
        let data = await AddressService.findAddressById(uid);
        ctx.response.type = 'utf-8';
        ctx.response.body = data;
    },
    // 删除地址
    delAddress: async (ctx, next) => {
        await next();
        let address_id = ctx.request.body.address_id;
        let data = await AddressService.delAddressById(address_id);
        ctx.response.type = 'utf-8';
        ctx.response.body = data;
    },
    // 获取收货人地址
    getReceiverAddress: async (ctx, next) => {
        await next();
        let address_id = Number(ctx.params.aid);
        let data = await AddressService.findAddressByOrderId(address_id);
        ctx.response.type = 'utf-8';
        ctx.response.body = data;
    }
}