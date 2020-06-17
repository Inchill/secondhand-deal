const Koa = require('koa');
const app = new Koa();
const router = require('./routes/router.ts');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const session = require('./config/session.ts');
const koaStatic = require('koa-static');
const path = require('path');
router(app);
session(app);

// 解决跨域
const allowOrigins = ['http://localhost:8080'];
app.use(cors({
    origin: function(ctx) {
        if(allowOrigins.includes(ctx.header.origin)) return ctx.header.origin;
        return false;
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    withCredentials:true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
app.use(bodyParser());
app.use(koaStatic(path.join(__dirname, './public/dist')));

app.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});