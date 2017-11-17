
//留言 ====== 一级回复的处理
const validator = require('validator');
const Article = require('../model/article');
const Reply = require('../model/reply');
const User = require('../model/user');
const at = require('../common/at');
const saveMessage = require('../common/message');

const moment = require('moment');

//设置全局语言---shh
moment.locale('zh-cn');
exports.postReply = (req, res, next) => {
    
    var content = validator.trim(req.body.content);
    console.log(content);
    //    服务端的数据验证
    if (content === '') {
        return res.end('内容不能为空');
    }
    //    判断文章是否存在
    // console.log(req.params.id)
    let article_id = req.params.id;
    // console.log( article_id)
    Article.getArticleById(article_id, (err, msg, article, reply) => {
        if (err) {
            return res.end(err);
        }
        var reply = new Reply();
        //回复的内容
        reply.content = content;
        //回复的那篇文章
        reply.article_id = article_id;
        // 回复人
       
        reply.author = req.session.user._id;
      
        reply.save()
            .then((reply) => {
                //保存回复数据，
                //返回的是promise对象
                // res.json({error:0,message:"留言回复成功",data:reply})
                return reply;
            }).then((reply) => {
                //    console.log(0)
                //    1.当前回复作者的积分加5 ，回复数量加1
                // console.log(req.session.user._id)
                User.getUserById(req.session.user._id, (err, user) => {

                    if (err) {
                        // console.log('0')
                        return res.end(err);
                    }
                    user.score += 5;
                    user.reply_count += 1;
                    user.save();
                    // console.log(user)
                    // //     //更新存储在req.session.user中的数据
                    req.session.user = user;
                });

                return reply;
            })
            .then((reply) => {
                //    2.更新文章的回复数量加1，最新回复的那个人，最新回复的时间，最新的那条回复
                // console.log(article)
                article.reply_num += 1;

                //    最新回复的人
                article.last_reply_author = req.session.user._id;
                //     最新的回复时间
                article.last_reply_time = new Date();
                //    最后的那个回复
                article.last_reply = reply._id;
                // // 2
                article.save();
               
                return reply;
                }).then((reply) => {
                // 3.通知文章作者（屏蔽掉自我留言），有人给他留言了，
                          
                if( article.author._id.toString() !== req.session.user._id.toString() ){
                              
                    saveMessage.saveReplyMessage(article_id, req.session.user._id, article.author._id, reply._id)
                }
                    // var time = moment(reply.create_time).fromNow();
                       
                res.json({ error: 0, message: '评论成功'})
                return reply;
            }).catch((err) => {
            res.end(err);
        })



        // 
    })




}




