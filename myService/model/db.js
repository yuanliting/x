const mongoose = require('mongoose');
const setting = require('../setting');
const crypto = require('crypto')
const User = require('../model/user')
// const url = require('url');
//这句话说明我们使用的promise对象是ES6中原生的promise对象.
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${setting.host}/${setting.db}`,{useMongoClient: true});
const DbSet = {
//  保存用户登录
   // 增加一条新数据
   addOne:(obj,req,res,logMsg)=>{
    //    console.log('-----+++++--')
        let newObj = new obj(req.body);
        newObj.save().then((result)=>{
            res.end(logMsg);
        }).catch((err)=>{
            res.end(err);
        })
    },
//    封装加密代码
    encrypt : (data,key)=>{ // 密码加密
        var cipher = crypto.createCipher("bf",key);
        var newPsd = "";
        newPsd += cipher.update(data,"utf8","hex");
        newPsd += cipher.final("hex");
        // console.log(newPsd)
        return newPsd;
    },
    // 解密
      decrypt : (data,key)=>{ //密码解密
        var decipher = crypto.createDecipher("bf",key);
        var oldPsd = "";
        oldPsd += decipher.update(data,"hex","utf8");
        oldPsd += decipher.final("utf8");
        return oldPsd;
    },



}
module.exports = DbSet