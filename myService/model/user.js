/**
 * Created by hama on 2017/5/10.
 */
//保存登录用户的信息
const mongoose = require('mongoose');
// 优化MongoDB的主键,即_id,格式化为端的,不重复的,唯一的,字符串
const shortid = require('shortid');
const moment = require('moment');
moment.locale('zh-cn');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    //用户的ID
    _id: {
        type: String,
        default: shortid.generate,
        unique: true //id经常会被查询，所以，把ID作为索引
    },
    //昵称
    name: {
        type: String,
        // require: true
    },
    //手机号
    uname:{
        type:String,
        required:true
    },
    //密码
    password: {
        type: String,
        require: true
    },
    //个人简介
    motto: {
        type: String,
        default: '这家伙很懒,什么都没有留下..'
    },
    //个人头像
    avatar: {
        type: String,
        default: '1510313496274.jpeg'
    },
    //创建时间
    create_time: {
        type: Date,
        default: Date.now
    },
    // 更新时间
    update_time: {
        type: Date,
        default: Date.now
    },
    // 文章数量
    artcile_count: {
        type: Number,
        default: 0
    },
    //回复数量
    reply_count: {
        type: Number,
        default: 0
    },
    //积分
    score: {
        type: Number,
        default: 0
    },
    // 关注量
    follows: {
        type: Array,
        default: []
    },
    // 被关注量
    be_follows: {
        type: Number,
        default: 0
    },
    // 
   likes:{
    type:Array,
    default:[]
    },
    //学校
   school:{
    type: String,
    require: true
   },
//    学历
   acad:{
    type: String,   
    require: true
   },
//    入学年份
   age:{
    type: String,
    require: true
   },
//    本科
   education:{
    type: String,
    require: true
   },
//    专业
   zhuanye:{
    type: String,
   },
//    爱好
   fav:{
    type: String, 
   },
// 近期动向
   attion:{
       type:String
   },
//    \地址
address:{
    type:Array,
    default:[]
},
// 生日
    birthday:{
        type:String
    },
    // 性别
    sex:{
        type:String,
        default:'男'
    }

})
// // 设置静态方法
UserSchema.statics = {
    //设置通过name查找
    getUserByName: (name, callback) => {
        User.findOne({uname: name }).then((user) => {
      
            callback(null, user);
        }).catch((err) => {
            callback(err);
        })
    },
      // 通过id查找用户,并返回数据
      getUserById: (id, callback) => {
        User.findOne({ '_id': id }).then((user) => {
            // console.log('+++++')
           callback( null , user)
        }).catch((err) => {
            // console.log('+++++')
            callback(err);
        })
    },


}


const User = mongoose.model('User', UserSchema);
module.exports = User;

