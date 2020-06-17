const session = require('koa-session');

module.exports = (app) => {
    //设置签名的cookie密钥
    app.keys = ['some secret hurr'];
    const CONFIG = {
        key: 'koa:sess',    // cookie中的key，默认是koa:sess
        maxAge: 86400000,   // 失效时间，单位是ms
        overwrite: true,   // 能否被覆盖，默认true
        httpOnly: true,  // 是否禁止客户端修改cookie，默认为true
        signed: true,  // 签名是否开启，与app.keys对应，默认true,防止浏览器暴力篡改
        secure: true   // 安全cookie  
    };
    app.use(session(CONFIG, app)); 
};