const UserService = require('../service/UserService.ts');
const tools = require('../config/tools.ts');

module.exports = {
    // 用户登录
    doLogin: async (ctx, next) => {
        await next();
        let phone = ctx.request.body.phone,
            password = ctx.request.body.password;
        let data = await UserService.getUserByPhone(phone);
        if(data.length) {   // 账号存在
            let user = data[0].dataValues;
            if(user.phone_num === phone && tools.debcrypt(password, user.password)) {
                let sid = ctx.cookies.get('sid');   // 获取sid
                if(ctx.cookies.get('sid')) {
                    // 如果存在sid
                } else {
                    ctx.session.sid = user.user_id;  // 设置session
                    ctx.cookies.set('sid', ctx.session.sid, {
                        domain: 'localhost',
                        path: '/',  // [注意]写入cookie中，path路径如果写的话，cookie写入是完全成功的，但是只有在写入路径下才能访问到cookie。
                        maxAge: 86400000,   // 失效时间，单位是ms(node里面都是毫秒)
                        overwrite: false,   // 能否被覆盖，默认true
                        httpOnly: false  // 允许客户端修改cookie，默认为true
                    });
                    sid = ctx.session.sid;
                }
                ctx.response.type = 'charset=utf-8';
                ctx.response.body = { success: true, msg: '登录成功！', sid: sid };
            } else {
                ctx.response.type = 'charset=utf-8';
                ctx.response.body = { success: false, msg: '账号或密码错误！' };
            }
        } else {   // 账号不存在
            ctx.response.type = 'charset=utf-8';
            ctx.response.body = { success: false, msg: '账号不存在！' };
        }
    },
    // 用户注册
    doRegister: async (ctx, next) => {
        await next();
        let phone = ctx.request.body.phone,
            password = ctx.request.body.password;
        let data = await UserService.getUserByPhone(phone);
        if(data.length) {  // 存在用户
            ctx.response.type = 'charset=utf-8';
            ctx.response.body = { success: false, msg: '该账号已存在！' };
        } else {  // 不存在用户
            let ret = await UserService.insertUser(phone, tools.enbcrypt(password));
            ctx.response.type = 'charset=utf-8';
            ctx.response.body = { success: true, msg: '注册成功！', data: ret };
        }
    },
    // 获取用户信息
    getUserById: async (ctx, next) => {
        await next();
        let uid = ctx.params.uid;
        let data = await UserService.findUser(uid);
        ctx.response.type = 'utf-8';
        ctx.response.body = data;
    },
    // 修改密码
    updatePass: async (ctx, next) => {
        await next();
        let uid = ctx.request.body.uid,
            form = ctx.request.body.form;
        let data = await UserService.findUser(uid);
        let user = data[0].dataValues;
        if(tools.debcrypt(form.pass, user.password)) {
            let data = await UserService.updatePass(uid, tools.enbcrypt(form.checkPass));
            ctx.response.type = 'utf-8';
            ctx.response.body = data;
        } else {
            ctx.response.type = 'utf-8';
            ctx.response.body = 201;
        }
    }
}