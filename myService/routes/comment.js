/**
 * Created by Administrator on 2017/10/11.
 */
// 二级回复的路由函数处理
//引入静态

const setting = require('../setting');
const validator = require('validator');
const Article = require('../model/article');
const User = require('../model/user');
// 导入消息通知机制
const at = require('../common/at');
const Reply = require('../model/reply');
const saveMessage = require('../common/message');
const Comment = require('../model/comment');

exports.Commit = (req, res, next) =>{
    // console.log(req.body);
    let content = validator.trim( String(req.body.RepCon) );
    let article_id = req.body.ArtId;
    let reply_id = req.body.ReplyId;
    let reply_author = req.body.reply_author;

    if( content === '' ){
        return res.end('内容不能为空');
    }
//     // 判断文章是否存在
    Article.getArticleById(article_id, (err, msg, article,reply ) =>{
        if(err){
            return res.end(err);
        }
        if(msg){
            return res.end(err);
        }
        // console.log(article)
        // 判断一级留言是否存在
        Reply.getReplyById(reply_id, (err, replyMsg, reply) =>{
            if(err){
                return res.end(err);
            }
        
            let comment = new Comment();
            comment.author = req.session.user._id;
            comment.content = content;
            comment.article_author = article.author._id;
            comment.article_id = article_id;
            comment.reply_id = reply_id;
            comment.reply_author = reply_author;
           
            comment.save().then( ( data ) =>{
                
                            // console.log(data)
                return data;
            }).then( (data) =>{
        //         // 1. 发表评论的人，积分+5，回复数量+1
                User.getUserById(req.session.user._id, (err, user) => {
                    if (err) {
                        return res.end(err);
                    }
                    user.score += 5;
                    user.reply_count += 1;
                   
                    user.save();
                    //更新存储在req.session.user中的数据
                    req.session.user = user;
                });
                return data;
            }).then((data)=>{
        //         // 2. 相对应的一级回复，回复数量+1
                 reply.comment_num +=1;
                    reply.save();
                 return data;
            }).then((data)=>{
        //          // 3. 通知一级回复的作者，有人给他留言了
            if( reply_author.toString() !== req.session.user._id.toString() ){ 
             saveMessage.saveReplyMessage(article_id, req.session.user._id, reply_author, reply_id);
                }
                 return data;
                 console.log('=======')
            }).then((data)=>{
        //     // 4. 通知文章作者(屏蔽自我留言)，有人给他留言了
        //     // 如果文章作者是一级回复的作者,不需要进行
            if( reply_author.toString() !== article.author._id.toString() ){
                    if( reply_author.toString() !== req.session.user._id.toString() ){
                        saveMessage.saveReplyMessage(article_id, req.session.user._id, article.author._id,reply_id, data._id);
                    }
                }
                return data;
            }).then((data)=>{
            // // 5. 通知被@的那个人，有人提到他了
            //     at.sendAtMessage(content, article_id, req.session.user._id, data._id);

                return data;
            }).then((data)=>{
                // console.log(data._id);
               Comment.getCommentById(data._id,(err,comments)=>{
                   if(err){
                       return res.end(err); 
                   }
                //    console.log(comments)
                   res.json({error:0,message:'二级回复成功'})
                    
               })

            }).catch( (err) =>{
                res.end(err);
            })
        })
    })
}
