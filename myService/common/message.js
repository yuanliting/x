// 生成所有的通知消息模块
const Message = require('../model/message');
const saveMessage = {
    //   谁在某篇文章中给你点赞了
    saveAtMessage: (article_id, author_id, target_id) => {
       
        let message = new Message();
        message.atType = 'at';
        message.article_id = article_id;
        message.author_id = author_id;
        message.target_id = target_id;

        // 保存
        message.save((msg) => {
            console.log('保存成功');
        })

    },
    //谁转发了你的文章
    saveShareMessage: (article_id, author_id, target_id) => {
        let message = new Message();
        message.atType = 'share';

        message.article_id = article_id;
        message.author_id = author_id;
        message.target_id = target_id;
       
        // 保存
        message.save((msg) => {
            console.log('保存成功');
        })
    },

    //    谁在某篇文章中给你留言了
    saveReplyMessage:(article_id, author_id, target_id, reply_id, comment_id) =>{
        let message = new Message();
       
        message.atType = 'reply';
        message.article_id = article_id;
        message.author_id = author_id;
        message.target_id = target_id;
        message.reply_id = reply_id;
        message.comment_id = comment_id
        //  保存
        message.save((msg) =>{
            console.log('一级回复保存成功');
        })
    }

}

module.exports = saveMessage;