/**
 * Created by hama on 2017/5/10.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const setting = require('../setting');
const _ = require('lodash');
// 日期格式化方法
const moment = require('moment');
// const User = require('./user')
const Reply = require('./reply');

//设置全局语言---shh
moment.locale('zh-cn');
const ArticleSchema = new Schema({
    //    标题,问题补充,分类,作者,创建时间,更新时间,浏览次数,回复数量,点赞数量
    //    最后的回复作者,嘴鸥后的回复时间,最后的回复内容
    _id: {
        type: String,
        default: shortid.generate,
        unique: true
    },
// 标题
    title: {
        type: String,
        require: true
    },
    // 内容
    content: {
        type: String,
        require: true
    },
    // 创建时间
    create_time: {
        type: Date,
        default: Date.now
    },

    // 分类
    category: {
        type: String,
        // default:null,
        require: true

    },
    author: {
        type: String,
        ref: 'User'//集合关联,ref:参考的集合名称
    },
    // 点击量
    click_num: {
        type: Number,
        default: 0
    },
    // 回复次数
    reply_num: {
        type: Number,
        default: 0
    },
    //点赞数量
    likes_num: {
        type: Number,
        default: 0
    },
    // 最后回复的人
    last_reply_author: {
        type: String,
        ref: 'User'
    },
    //最后的回复   ===最后的那个回复
    last_reply: {
        type: String,
        ref: 'Reply'

    },
    // 做后回复的时间
    last_reply_time: {
        type: Date,
        default: Date.now
    },
    // 删除功能
    deleted: {
        type: Boolean,
        default: false
    },
    time:String,


})


// 设置静态方法
ArticleSchema.statics = {
    // 通过id查找当前文章
    getArticleById: (id, callback) => {
        // populate()关联查询==---查询并获取参考集合数据
        Article.findOne({ '_id': id, deleted: false }).populate('author').then((article) => {
            if (!article) {
                return callback(null, '文章不存在或已删除')
            }
            // callback(null,)
            // console.log(article)
            //获取当前文章所有的回复列表
            Reply.getReplysByArticleId(article._id, (err, replys) => {
                // console.log(replys)
                callback(null, '', article, replys);
            });

        }).catch((err) => {
            callback(err);
        })
    },
  
    //获取文章的长度
    getCountArticle: (query, callback) => {
        Article.find(query).find({ deleted: false }).populate('author').count((err, count) => {
            if (err) {
                    callback(err)
            }else{
                callback(null,count);
            }

        })
    },
    //删除文章
    getRemoveArticle:(id,callback)=>{
        Article.findOneAndRemove({ '_id' : id, deleted : false}).then((article)=>{
            callback(null,article);
        }).catch((err)=>{
                callback(err);
        })
    },
//    根据条件查找相应的文章
    getArticleByQuery:(category,callback)=>{
     
        Article.find({category:category,deleted:false}).populate('author').then((articles)=>{
            // if(articles.length == 0){
            //     return callback(null,[]);
            // }
            return callback(null,articles);

        }).catch(err=>{
            return callback(err);
        })
    },
    // 根据文章作者查找文章
    getArticleByAuthor:(author,callback)=>{
        Article.find({'author':author,deleted:false}).populate('author').then((articles)=>{
            
            return callback(null,articles);

        }).catch((error)=>{
                return callback(error)
        })


    }

}




const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article

