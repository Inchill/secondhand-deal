const FeedbackService = require('../service/FeedbackService.ts');

module.exports = {
    // 添加反馈
    addFeedback: async (ctx, next) => {
        await next();
        let uid = ctx.request.body.uid,
            content = ctx.request.body.content,
            add_time = ctx.request.body.add_time;
        let data = await FeedbackService.insertFeedback(uid, content, add_time);
        ctx.response.type = 'utf-8';
        if(data) ctx.response.body = 200;
        else ctx.response.body = 'insert failed';
    }
}