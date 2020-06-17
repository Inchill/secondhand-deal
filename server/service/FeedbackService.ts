const feedbackModel = require('../model/FeedbackModel.ts');

module.exports = {
    // 添加反馈
    insertFeedback: async (uid, content, add_time) => {
        return await feedbackModel.Feedback.create({
            user_id: uid,
            content: content,
            add_time: add_time
        })
    }
}