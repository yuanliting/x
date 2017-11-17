


var express = require('express');
var router = express.Router();
const User = require('../model/user');
const Article = require('../model/article');
const at = require('../common/at');
const saveMessage = require('../common/message');
const ShareArt = require('../model/shareArt')
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
// 资料修改
router.upload = (req, res, next) => {
    // console.log(req.body)
    // console.log(req.session.user)
    var id = req.session.user._id
    var data = req.body;
    User.getUserById(id, (err, user) => {
        if (err) {
            return res.json({ error: 1, message: '系统错误' })
        }     
        user.school = data.school;
        user.acad = data.acad;
        user.age = data.age;
        user.education = data.education;
        user.motto = data.motto;
        user.name = data.name;
        user.birthday = data.birthday;
        user.address = data.address;
        user.zhuanye = data.zhuanye;
        user.fav = data.fav;
        user.attion = data.attion;
        user.sex = data.sex;
        user.save();
        req.session.user = user;
   res.json({error:0,message:"修改成功"})
    })
}
// 获取该登录者的信息
router.getUse = (req, res, next) => {
    // console.log('......')
    // console.log(req.session.user);
    var user = req.session.user;
    // console.log(user)
    res.json({ error: 0, data: user, message: "数据获取成功,...." })


}
// 获取登陆者的文章列表
router.getAllArt = (req,res,next) => {

    // console.log(req.session.user);
    var author = req.session.user._id;
    Article.getArticleByAuthor(author,(error,articles)=>{
        if(error){
            return res.json({error:1,message:'系统失败'})
        }
        // console.log(articles);
        ShareArt.find({deleted: false}).populate('author').populate('share_article').populate('article_author').then((shares)=>{
            
                        shares.forEach(function(share){
                                  articles.push(share);
                        })
            res.json({error:0,message:"获取文章成功",data:articles})
         })
    })

}
//修改头像
router.imageupload = (req,res,next)=>{
    // console.log(req.body);

    var id = req.session.user._id;
    // console.log(id);
    User.getUserById(id,(error,user)=>{
            if(error){
                return res.json({error:1,message:'上传失败'})
            }
            user.avatar = req.body.picture ;
            req.session.user = user
            user.save();
            // console.log(user);
            res.json({error:0,message:'头像上传成功'});
    })

}

//获取当前登录的相关消息
router.userCen = (req,res,next) =>{
    console.log(req.session.msgCount);
    var num = req.session.msgCount;
    var tephone = req.session.user.uname;
    res.json({error:0,message:'成功',data:num,tephone:tephone})
} 

// 关注模版
router.like = (req,res,next)=>{
    // console.log(req.params.id);
    var category = req.params.id;
    var id = req.session.user._id;
    // console.log('==================')
    User.getUserById(id,(error,user)=>{
    if(error){
        return res.json({error:1,message:'系统失败'})
    }
    if(user.likes.indexOf(category) < 0 ){
        user.likes.push(category);
    }
   
    user.save();
    req.session.user = user;
    // console.log(user)
    res.json({error:0,message:'关注成功'})

    })

}
// 取消关注
router.defalike = (req,res,next)=>{
    
    var category = req.params.id;
    var id = req.session.user._id;
    
    User.getUserById(id,(error,user)=>{
    if(error){
        return res.json({error:1,message:'系统失败'})
    }
    user.likes.forEach((item,index) => {
        if(item == category){
            user.likes.splice(index,1);
        }
    });

    user.save();
    req.session.user = user;
    console.log(user)
    res.json({error:0,message:'取消成功'})

    })


}

//获取关注模版
router.getCate = (req,res,next)=>{
    var id = req.session.user._id
    // console.log(id)
    User.getUserById(id,(error,user)=>{
        // console.log(user)
        if(error){
            return res.json({error:1,message:'系统错误 '})
        }
        var lists = user.likes
        res.json({error:0,message:'获取成功',data:lists});

    })

} 

// 点赞
router.dian = (req,res,next)=>{
        // console.log(req.body);
        // 当前的文章id
        var ArtiTd = req.body.id;
        var id = req.session.user._id;

    User.getUserById(id,(error,user)=>{
        if(error){
        return res.json({error:1,message:'系统错误 '})
        }
    if(user.follows.indexOf(ArtiTd)< 0 ){
        user.follows.push(ArtiTd);
    }
    //点赞通知
    Article.getArticleById(ArtiTd,(err,msg,article,reply)=>{
                if(err){
                    return res.end(err);
                }
       
        if(article.author._id.toString() !== req.session.user._id.toString()){
       
          
            saveMessage.saveAtMessage(article._id, req.session.user._id, article.author._id);
        }  
    
        user.save();
        req.session.user = user;
        // console.log(user)
        res.json({error:0,message:'点赞成功',data:user.follows})
    })
   
    })
}

// 取消点赞
router.defdian = (req,res,next)=>{
    // console.log(req.body);
    var ArtiTd= req.body.id;
    var id = req.session.user._id;
 User.getUserById(id,(error,user)=>{
    if(error){
        return res.json({error:1,message:'系统失败'})
    }
    user.follows.forEach((item,index) => {
        if(item == ArtiTd){
            user.follows.splice(index,1);
        }
    });

    user.save();
    req.session.user = user;
    // console.log(user)
    res.json({error:0,message:'取消成功',data:user.follows})
 })

}






module.exports = router;
