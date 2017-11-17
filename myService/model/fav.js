
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const FavSchema = new Schema({
    _id:{
        type:String,
        default:shortid.generate,
        unique:true
    },
    //分类的父级ID
    parentId:{
        type:Number,
        default:0
    },
    //分类名称
    name:String,
    user:{
        type:String,
        ref: 'user'//集合关联,ref:参考的集合名称
    }
})
// 设置静态资源方法
// 
FavSchema.statics={
        getUserById:(id,callback)=>{
       Fav.find({user:id}).populate('user').then((favs)=>{
                if(favs){
                    return callback(null,favs)
                }
        callback( null,'你还没添加喜欢的模版,请先去添加');
       }).catch((error)=>{
        return callback(err);
       })         
        }
}
const Fav = mongoose.model('Fav',FavSchema);
module.exports = Fav;
