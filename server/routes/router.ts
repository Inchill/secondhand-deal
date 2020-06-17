const router = require('koa-router')();
const UserController = require('../controller/UserController.ts');
const GoodsController = require('../controller/GoodsController.ts');
const CategoryController = require('../controller/CategoryController.ts');
const CartController = require('../controller/CartController.ts');
const AddressController = require('../controller/AddressController.ts');
const FeedbackController = require('../controller/FeedbackController.ts');
const OrderController = require('../controller/OrderController.ts');
const ImageController = require('../controller/ImageController.ts');

module.exports = (app) => {
    // 获取所有商品
    router.get('/site/index', GoodsController.getAllGoods);
    // 发布商品信息
    router.post('/site/goods', GoodsController.publishGoods);
    // 根据关键字搜索商品
    router.get('/site/search', GoodsController.searchGoods);
    // 获取商品种类
    router.get('/site/category', CategoryController.getCategory);
    // 根据种类筛选商品
    router.get('/site/goods/:id', GoodsController.getGoodsByCategory);
    // 分页显示商品
    router.get('/site/goodsPage', GoodsController.getGoodsByPage);
    // 根据商品id查询商品
    router.get('/site/findGoods/:id', GoodsController.getGoodsById);
    // 用户登录
    router.post('/site/login', UserController.doLogin);
    // 用户注册
    router.post('/site/register', UserController.doRegister);
    // 获取用户信息
    router.get('/site/user/:uid', UserController.getUserById);
    // 修改用户密码
    router.post('/site/user', UserController.updatePass);
    // 获取推荐商品
    router.get('/site/recommend', GoodsController.getRecommendGoods);
    // 添加到购物车
    router.post('/site/addToCart', CartController.addToCart);
    // 获取购物车
    router.get('/site/cart/:uid', CartController.getUserCart);
    // 更改购物车商品数量
    router.post('/site/cart', CartController.changeCartCount);
    // 删除购物车商品
    router.post('/site/delCartGoods', CartController.delCartGoods);
    // 支付后删除购物车商品
    router.post('/site/emptyCart', CartController.emptyCart);
    // 添加地址
    router.post('/site/addAddress', AddressController.addAddress);
    // 获取用户地址
    router.get('/site/getAddress/:uid', AddressController.getAddress);
    // 获取收货人地址
    router.get('/site/getReceiverAddress/:aid', AddressController.getReceiverAddress);
    // 删除地址
    router.post('/site/delAddress', AddressController.delAddress);
    // 提交反馈
    router.post('/site/feedback', FeedbackController.addFeedback);
    // 提交一条订单
    router.post('/site/addOrder', OrderController.addOrder);
    // 获取用户订单
    router.get('/site/order/:uid', OrderController.getOrder);
    // 获取商家订单
    router.get('/site/publisherOrder/:uid', OrderController.getPublisherOrder);
    // 确认收货
    router.post('/site/receipt', OrderController.confirmReceipt);
    // 上传商品辅图
    router.post('/site/uploadImages', ImageController.uploadImages);
    // 根据goods_id查询辅图
    router.get('/site/getImages/:gid', ImageController.getImages);
    app.use(router.routes()).use(router.allowedMethods());
};