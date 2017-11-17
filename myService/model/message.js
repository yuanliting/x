/**
 * Created by hama on 2017/5/10.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const MessageSchema = new Schema({
    //   消息通知类型
    // 1.文章发布时,提到某人,给他发通知
    // 2.给文章留言时,提到某人,给某人发通知,还得告诉文章的作者,评论了文章,给文章作者发通知

    // 3.给文章留言写评论时,提到某人,给某人通知,得通知文章作者,还得通知留言的那个人
    _id: {
        type: String,
        default: shortid.generate,
        unique: true
    },
    // 登陆的那个人
    author_id: {
        type: String,
        ref: 'User',//参考的某个数据集合
    },
    // 文章标题
    article_id: {
        type: String,
        ref: 'Article'
    },
    // 被@的人
    target_id: {
        type: String,
        ref: 'User'
    },
    // 创建时间
    create_time: {
        type: Date,
        default: Date.now
    },
    //创建@的类型
    atType: {
        type: String
    },
    reply_id: {
        type: String,
        ref: 'Reply'
    },
    // 二级回复的id
    comment_id: {
        type: String,
        ref: 'Comment'
    },
    // 是否已读
    has_read: {
        type: Boolean,
        default: false
    }
})

// 
MessageSchema.statics = {
    // 获取未读消息的长度
    getNoReadCounts: (id, callback) => {
        Message.find({ 'target_id': id, has_read: false }).count((err, count) => {
            if (err) {
                callback(err);
            } else {
                callback(null, count)
            }
        })
    },
    //获取所有的消息列表
    getReadMsgs: (target_id, callback) => {
        Message.find({ target_id: target_id}).populate('author_id').populate('article_id').populate('reply_id').then((readMsgs) => {
           
        callback(null,readMsgs);
        }).catch((err) => {
            callback(err);
        })
    },
    getMessageById:(message_id,callback)=>{
            Message.findOne({'_id': message_id, has_read: false }).populate('author_id article_id').then((message) => {
           
            callback(null, message);
        }).catch((err) => {
            callback(err);
        })
    }


}

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message
