
// 描述用户相关信息及其权限
const User = require('../model/user');
const setting = require('../setting');
const Message = require('../model/message');

const auth = {
    // 封装生成cookie的代码
    create_cookie:function(user,res){
        // 设置cookie信息  --- 对cookie进行再次加密
        let auth_token = `${user._id}$$$$`;
        // console.log( auth_token)
        // console.log(setting.auth_cookie_name)

        res.cookie(setting.auth_cookie_name, auth_token,{
            signed:true,
             maxAge:1000 * 60 * 6 * 24 * 30,
             path:'/'
        }  )
        // console.log('------')
        // console.log( res.cookie)
    },
    // 封装生成session的代码
    // 通过浏览器端返回的cookie信息生成session
    // req.signedCookies 获取被签名的cookie
    create_session:function(req, res, next){
        // console.log(req.signedCookies );
        // 判断是否有用户登录 req.session.user
        if(req.session.user){
            console.log('user已设置');

            // 查找通知消息的个数
            Message.getNoReadCounts(req.session.user._id,  (err, count) =>{
                if(err){
                    return next();
                }
                req.session.msgCount = count;
                req.session.isLogin = true;
                next();

            })

        }else {
            console.log('未设置user');
            // console.log(setting.auth_cookie_name)
            let auth_token = req.signedCookies[setting.auth_cookie_name];

            // console.log(auth_token);
            // console.log('+++++')
            if( !auth_token ){
                return next();
            }
            
            // split()将字符串分割成数组
            let auth = auth_token.split('$$$$');
            // console.log(auth);
            let user_id = auth[0];
            User.getUserById(user_id, (err, user) => {
                if(err){
                    return next();
                }
                // 查找通知的个数
                Message.getNoReadCounts(user._id, (err, count) =>{
                    if(err){
                        return next();
                    }
                    req.session.msgCount = count;
                    req.session.user = user;
                    req.session.isLogin = true;
                    next();
                  
                })
                // console.log(req.session.user)

            })


        }

    }
}
module.exports = auth;
