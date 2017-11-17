
var express = require('express');
var router = express.Router();
const validator = require('validator');
const setting = require('../setting');
const User = require('../model/user');
const Article = require('../model/article');
const Comment = require('../model/comment');
const moment = require('moment');
const Share = require('../model/shareArt');
const saveMessage = require('../common/message');
/* GET users listing. */
// ********发布文章************
router.fabu= (req, res, next)=> {
    
        if(req.session.user.name){
            req.body.author = req.session.user._id;
        }else{
            req.body.author = req.session.user._id;
        }
   let title = validator.trim(req.body.title);
    let content = validator.trim(req.body.content);
    let category = validator.trim(req.body.category);
    // console.log('ceshi')
       // map()通过return 改变数据组元素,形成新的数组元素
    let allTabs = setting.categorys.map((item) => {
        // console.log(item)
        return item;
    })  
    if (!allTabs.includes(category)) {
        return res.json({error:1,messge:'请选择一个正确分类'})
    }
    // console.log('ceshi')
    
    // 生成实例化数据
    let newObj = new Article(req.body);

       // 存储文章 -----修改作者相关信息:文章发布数量+1,积分+5 
       newObj.save().then((article) => {
        //
        User.getUserById(req.session.user._id, (err, user) => {
            if (err) {
                return res.end(err);
            }
            user.score += 5;
            user.artcile_count += 1;
            
            article.time =  moment(article.create_time).fromNow();
            article.save();
            user.save();
            // console.log(user)
            //更新存储在req.session.user中的数据
            req.session.user = user;
            // console.log(req.session.user+"222222")
            // 跳转到相应的文章页面
            // res.redirect('/shouye');
            // console.log(`/question/${article._id}`)
            res.json({ message: '更新个人信息成功',error:0  })
        })
           
        return article;//return出来的是个新的promise对象

    }).catch((err) => {
       res.json({error:1,message:'保存失败'})
    })    
};
// ********评论文章****************
router.commit = (req,res,next)=>{
    var id = req.params.id
    // console.log(id)
   Article.getArticleById(id,(err,msg,article ,replys)=>{
       if(err){
            return res.json({error:1,message:"查找失败"})
       }
       //查找该文章下所有的二级回复
       Comment.getCommentByArticleId(id,(error,comments)=>{
                    if(error){
                        return res.json({error:1,message:'获取数据失败'})   
                    }
                    // console.log(comments)
               // 浏览次数加1
            article.click_num++;
            article.save();
             // console.log(replys)
             //点赞
             var user = req.session.user.follows;
            res.json({error:0,message:'获取数据成功',data:article,replys:replys,user:user,comments:comments})
       })
   })
}
// *********分类文章**************
router.cate = (req,res,next)=>{
    // console.log(req.params);
    var category = req.params.name;
    Article.getArticleByQuery(category,(err,articles)=>{
    if(err){
    return res.json({error:1,message:'文件获取失败'})
    }
    res.json({error:0,message:"查找成功",data:articles,user:req.session.user.likes})

})
}
// *********删除文章****************
router.delArt = (req,res,next) => {

        // console.log(req.body);
        var id = req.body._id;
        Article.getRemoveArticle(id,(err,article)=>{
            if(err){
                return res.json({error:1,message:'删除失败'})
            }
            res.json({error:0,message:'删除成功'})
        })
}
// ************获取该文章的信息********************
router.Getarticle = (req,res,next)=>{
            // console.log(req.params);
        var id = req.params.id;
        Article.getArticleById(id,(error,msg,article,replys)=>{
            if(error){
                return res.json({error:1,message:"查找失败"})
           }
        //    console.log(article)
          return res.json({errro:0,message:'获取成功',data:article}) 
    
        })


}

// **********编辑文章*****************
router.editArt = (req,res,next)=>{
    // console.log(req.body);
    // console.log(req.params.id)
    var id = req.params.id;

    Article.getArticleById(id,(error,msg,article,replys)=>{
        if(error){
            return res.json({error:1,message:"查找失败"})
       }
        // console.log(article)
        article.content = req.body.content;
       article.save();
       return res.json({error:0,message:'编辑成功'})



    })

}

// **********转发文章******************
router.ShareArt = (req,res,next)=>{
    // console.log(req.body);
    if(req.session.user.name){
        req.body.author = req.session.user._id;
    }else{
        req.body.author = req.session.user._id;
    }
    let content = validator.trim(req.body.content);
    
    let newObj =  new Share({
                content:content,
                category:req.body.category,
                title:req.body.title,
                share_article:req.body.id,
                author:req.body.author,
                article_author:req.body.article_author
    });
   
    newObj.save().then((Share)=>{

        Share.time =  moment(Share.create_time).fromNow();
        Share.save();
        return Share;
    }).then((Share)=>{
        // 给被转发的人发通知,有人转发了你的文章
        // 谁 转发了 你 的某篇文章
        if( req.body.article_author._id.toString() !== req.session.user._id.toString() ){
                saveMessage.saveShareMessage(req.body.id,req.session.user._id,req.body.article_author)
        }
        res.json({ message: '转发成功',error:0  })
    })
    
    
    
   
    .catch((error)=>{
        res.json({error:1,message:'转发失败'})       
    });

}






module.exports = router;
