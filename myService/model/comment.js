
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const setting = require('../setting');
const _ = require('lodash');
// 日期格式化方法
const moment = require('moment');


const CommentSchema = new Schema({
    // 回复的id
    _id:{
        type:String,
        default:shortid.generate,
        unique:true
    },
    // 回复的作者
    author:{
        type:String,
        ref:'User'
    },
    // 文章id
    article_id:{
         type:String,
        ref:'Article'
    },
    // 文章的作者
    article_author:{
        type:String,
        ref:'User'
    },

    // 一级回复的作者
    reply_author:{
        type:String,
        ref:'User'
    },
    // 多级回复的Id   //可忽略
     comment_id:{
            type:String,
            ref:'Comment'
     },
    // 多级回复的作者
    comment_author_id:{
        type:String,
        ref:'User'
    },
    //一级回复的id
    reply_id:{
        type:String,
        ref:'Reply'
    },
    // 回复的时间
    create_time:{
        type:Date,
        default:Date.now
    },
    // 回复的内容
    content:{
        type:String
    },
    // 点赞量
   
    // 是否删除
    deleted:{
        type:Boolean,
        default:false
    }
})
CommentSchema.statics={
    getCommentsByReplyId:(reply_id,callback)=>{
       Comment.find({reply_id:reply_id,deleted:false}).sort({'time':-1}).populate('author').then((comments)=>{
          callback(null,comments)
       }).catch((err)=>{
        callback(err);
       })

    },
    getCommentById:(id,callback)=>{
       Comment.find({'_id':id,deleted:false}).populate('author').then((comments)=>{
          callback(null,comments)
       }).catch((err)=>{
        callback(err);
       })
    },
    getCommentByArticleId:(article_id,callback)=>{
        Comment.find({article_id:article_id,deleted:false}).populate('author').populate('reply_author').then((comments)=>{
            callback(null,comments);
        }).catch((err)=>{
            callback(err)
        })
    }
}

const Comment = mongoose.model('comment',CommentSchema);
module.exports = Comment;