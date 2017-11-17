const express = require('express');
const router = express.Router();
var index = require('./routes/index');
var users = require('./routes/users');
var article = require('./routes/article');
var reply = require('./routes/reply');
var message = require('./routes/message');

var multer = require('multer');
var comment = require('./routes/comment');
//注册
router.post('/zhuce',index.register);
//登录
router.post('/login' , index.login);
// 退出
router.get('/tuichu',index.tuichu);
// 发布
router.post('/fabu',article.fabu);
// 调到评论页面
router.get('/commit/:id',article.commit);
//评论页面
router.post('/commit/:id',reply.postReply);
// 分类页面
router.get('/cater/:name',article.cate);
// 个人设置
router.post('/upload',users.upload);
//消息通知数量
router.get('/getUser',users.userCen)
//搜索功能添加
router.post('/search',index.search); 

// *****************************
//显示该作者的信息
router.get('/userCenter',users.getUse);

// 显示页面
router.get('/show',index.getAll);
// 个人中心页面
router.get('/user/article',users.getAllArt)
//删除文章
router.post('/del/article',article.delArt);
//编辑文章************************************
router.post('/edit/:id',article.editArt)
// 获取要编辑的文章*************************************
router.get('/edit/:id',article.Getarticle)
//二级回复
router.post('/reply/commit',comment.Commit)

//转发文章
router.post('/share',article.ShareArt);




//修改登录这头像
var storage = multer.diskStorage({
    destination:'public/uploads',
    filename: function (req, file, cb) {
        var times = Date.now();
        cb(null, times +'.jpg');
        req.body.picture = times + ".jpg"
    }
})
var upload = multer({storage:storage});
router.post('/imageupload',upload.single('auto'),users.imageupload);
//忘记密码 
router.post('/forget',index.forget);

// ********************************
//消息通知
router.get('/message',message.index);

//点赞
router.post('/dian',users.dian);
// 取消点赞
router.post('/defdian',users.defdian)


//关注模版  ========
router.get('/like/:id',users.like);
// 取消关注
router.get('/defalike/:id',users.defalike);
// 获取关注列表
router.get('/getCate',users.getCate);

module.exports = router;
