# 校园闲置物品交易系统

## 项目简介

本项目将买家端和卖家端合并为一个整体，分为五个主体功能——首页、推荐、发布、购物车及我的。

首页包括分类导航、搜索、物品列表。推荐包含推荐悬浮按钮、物品列表。发布包含一个表单，用户需要输入名称、价格、数量、描述，选择类型并上传图片后，就可以点击发布按钮将商品发布到平台上。购物车包括购物车管理及推荐，购物车管理包括删除、结算功能。我的包含地址管理、订单管理、发布管理、密码修改、反馈及退出。

## 技术栈

本项目采用前后端分离的模式进行开发，具体用到的技术如下：

> 前端

1. webpack
2. vue.js
3. stylus
4. typescript
5. axios

> 后端

1. koa2
2. sequelizeORM
3. mysql
4. bcrypt.js
5. jest

## 使用

**注意：项目拉取到本地后，你需要在数据库创建数据库和相应的几张表。具体要创建哪些表，请到server文件夹下的model挨个创建。**

```shell
# install dependencies
npm i

# run client on port 8080
npm run dev

# run server on port 3000
npm run dev-server
```