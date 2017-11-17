const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const setting = require('../setting');
const _ = require('lodash');
// 日期格式化方法
const moment = require('moment');

//设置全局语言---shh
moment.locale('zh-cn');
// 数据处理
const ReplySchema = new Schema({
    // 回复id
    _id:{
        type:String,
        default:shortid.generate,
        unique:true
    },
    // 回复的内容
    content:{
        type:String,
        require:true
    },
    //回复时间
    create_time:{
        type:Date,
        default:Date.now
    },
    //回复的那个人
    author:{
        type:String,
        ref:'User'
    },
    // 回复的文章
    article_id:{
        type:String,
        ref:'Article'
    },
    //二级回复量---comment
    comment_num:{
        type:Number,
        default:0
    },
    // 当前回复的点赞量
     likes:{
        type:Number,
        default:0
    },
    //回复是否被删除
    deleted:{
        type:Boolean,
        default:false
    }

})
ReplySchema.methods.create_time_ago = function(){
        // this
       let time  = moment(this.create_time).fromNow();
        return time;
}
//
    ReplySchema.statics = {
    //    查找当前所有文章的所有回复
        getReplysByArticleId:(article_id,callback)=>{
            Reply.find({article_id:article_id,deleted:false}).populate('author').then((replys)=>{
              
                callback(null,replys);
            }).catch((err)=>{
                callback(err);
            })
        },
        // 根据id查找某个回复
        getReplyById:(reply_id,callback)=>{
                Reply.findOne({'_id':reply_id,deleted:false}).then((reply)=>{
                    if(!reply){
                           return callback(null,'当前留沿不存在,不能进行评论');
                    }
                    callback(null,'',reply);

                }).catch((err)=>{
                    callback(err)
                })
        },
        // 根据作者查找相应的回复
        getRepliesByAuthorId:(author_id,opt,callback)=>{
            Reply.find({author:author_id},{},opt).populate('author').populate('article_id').then(replies=>{
                return callback(null,replies);
            }).catch(err=>{
                return callback(err);
            })
        }
    }
    
const Reply = mongoose.model('Reply',ReplySchema);
module.exports = Reply;