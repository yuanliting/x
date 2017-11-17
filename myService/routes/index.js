

var express = require('express');
var router = express.Router();
const validator = require('validator');
const Dbset = require('../model/db');
const User = require('../model/user');
const Article = require('../model/article');
const setting = require('../setting');
const auth = require('../common/auth');
const ShareArt = require('../model/shareArt')
// const setting = require('../setting')

/* GET home page. */
// **************显示信息*********
exports.getAll = (req,res,next)=>{
    // console.log('ceshi')
    var user = req.session.user;
    var num = req.query.limit * 1;
    // 获取所有文章显示
    Article.find({ deleted: false }).limit(num * 6).populate('author').then((articles) =>{
              if(!articles){
                return res.json({error:1,message:'还没有相关文章发布'})
              }
        ShareArt.find({deleted: false}).limit(num * 2).populate('author').populate('share_article').populate('article_author').then((shares)=>{

            shares.forEach(function(share){
                      articles.push(share);
            })

            res.json({error:0,message:'文章获取成功',data:articles,num:req.session.msgCount,user:user});
        }).catch((error)=>{
          res.json({ error: 1, message: '查找失败' });
        })



             
    }).catch((error)=>{
      res.json({ error: 1, message: '查找失败' });
    })
  

}
// 注册信息***************************
exports.register = (req, res, next) => {

  uname = req.body.uname;
  password = req.body.password;
  if (!validator.matches(uname, /^1[3|4|5|8][0-9]\d{4,12}$/, 'g')) {
    // error = '手机号不合法';
    return res.json({ error: 1, message: '手机号不合法' });
  }

  if (!validator.matches(password, /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{6,11}/, 'g')) {
    // error = '密码不合法,长度为6-11';
    return res.json({ error: 1, message: '密码不合法,长度为6-11'});
  }

 
  User.findOne({ uname: uname }).exec().then((user) => {
 
    if (user) {
      return res.json({ error: 1, message: '该用户已注册,请登录....' });
    }
    let newPsd = Dbset.encrypt(password, setting.PSDkey);
    req.body.password = newPsd;
    // console.log('-----')
    Dbset.addOne(User, req, res, 'success');
    res.json({ error: 0, message: 'success' });
  }).catch((err) => {
    res.json({ error: 1, message: '注册失败' });
  })
};
// ***************登录信息****************************
exports.login = (req, res, next) => {
  // console.log(req.body);
  var name = req.body.uname;
  var password = req.body.password
  if (!validator.matches(name, /^1[3|4|5|8][0-9]\d{4,12}$/, 'g')) {
    error = '手机号不合法';
    return res.json({ error: 1, message: error });
  }

  if (!validator.matches(password, /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{6,11}/, 'g')) {
    error = '密码不合法,长度为6-11';
    return res.json({ error: 1, message: error });
  }
    User.getUserByName(name,(err,user)=>{
        if(err){
          return res.json({error:1,message:'获取数据失败'})
        }
        if (!user) {
          return res.json({error:1,message:'用户名未注册'});
      }
      // console.log(user)
      let newPsd = Dbset.encrypt(password, setting.PSDkey);
      if (newPsd !== user.password) {
        return res.json({error:1,message:'密码错误,请重新输入...'});
    }
     
    // 创建cookie
    auth.create_cookie(user, res);
    // console.log(req.session.msgCount)
    // var num = req.session.msgCount
     res.json({error:0,message:'登录成功...'});
    })

};
// *******************退出*********************
// 退出处理
exports.tuichu = (req, res, next) => {
  // console.log('------------')
  req.session.destroy();//销毁数据
  res.clearCookie(setting.auth_cookie_name);//清空cookie
  res.json({error:0,message:'退出成功'})
}

// 忘记密码

exports.forget = (req,res,next)=>{

    console.log(req.body);
    uname = req.body.uname;
    password = req.body.password;
    if (!validator.matches(uname, /^1[3|4|5|8][0-9]\d{4,12}$/, 'g')) {
      error = '手机号不合法';
      return res.json({ error: 1, message: error });
    }
  
    if (!validator.matches(password, /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{6,11}/, 'g')) {
      error = '密码不合法,长度为6-11';
      return res.json({ error: 1, message: error });
    }
  
   
    User.findOne({ uname: uname }).exec().then((user) => {
        console.log(user)
      if (!user) {
        return res.json({ error: 1, message: '该用户还未注册,请注册....' });
      }
      let newPsd = Dbset.encrypt(password, setting.PSDkey);
      if(newPsd === user.password){
        return res.json({ error: 1, message: '新密码不能与原密码相等' });
      }

      user.password = newPsd
        user.save();

      res.json({ error: 0, message: 'success' });
    }).catch((err) => {
      res.json({ error: 1, message: '注册失败' });
    })

}

// 搜索信息
exports.search = (req,res,next)=>{

  console.log(req.body)
  var con = req.body.con;
      console.log(con)
      console.log('......')
      var category = []
      setting.categorys.forEach(function(item){
            console.log(item)
          
          if(item == con){
            console.log('000000')
                category.push(item)
          }
      })
          console.log(category.length)
          if(category.length<=0){
                return res.json({error:1,message:'没有该模版内容'})
          }



  Article.getArticleByQuery(category[0],(error,articles)=>{
    if(error){
      return res.json({error:1,message:'获取数据失败'})
    }
    
    return res.json({error:0,message:'查找成功',category:con})


  })




}





