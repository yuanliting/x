// 处理的为消息通知机制@某人情况
// 1.判断内容是否有@User的出现
// 2.如果有,通知被@的那个人
const User = require('../model/user');
// 是js工具库(函数方法库).对数组或对象进行处理
const _ = require('lodash');
const saveMessage = require('./message');
const at = {
    getAtUsers: (content) => {
        console.log('消息通知...');
        // console.log(content);

        //    排除非法字符,以及邮箱
        let ignoreRegexs = [
            /```.+?```/g, // 去除单行的 ```
            /^```[\s\S]+?^```/gm, // ``` 里面的是 pre 标签内容
            /`[\s\S]+?`/g, // 同一行中，`some code` 中内容也不该被解析
            /^    .*/gm, // 4个空格也是 pre 标签，在这里 . 不会匹配换行
            /\b\S*?@[^\s]*?\..+?\b/g, // somebody@gmail.com 会被去除
            /\[@.+?\]\(\/.+?\)/g, // 已经被 link 的 username
        ]
        // 凡是匹配以上的验证规则的内容,被替换成''
        ignoreRegexs.forEach((item) => {
            //    replace(验证规则,新内容)
            content = content.replace(item, '');
        })
        //    console.log(content);
        // 获取@User User的验证规则/@[a-zA-Z0-9_]/
        let pattern = /@[a-zA-Z0-9_]+\b/igm;

        let results = content.match(pattern);
        // console.log(results);

        let users = [];
        if (results) {
            results.forEach((result) => {
                users.push(result.slice(1));
            })
        }
        // 得到重复用户的数组
        // console.log(users);
        // 进行数组排重,得到唯一的元素
        users = _.uniq(users);
        // console.log(users);

        return users;
    },
    // 
    sendAtMessage: (content, article_id, author_id, reply_id) => {
        // at.getAtUsers(content);
        //[user1,user2]查找用户,并给用户发送消息
        User.getUsersByNames(at.getAtUsers(content), (err, users) => {
            if (err) {
                return res.end(err);
            }
            // 发送消息通知
            // console.log(users);
            users.forEach((user) => {
                //当前
                // @的时候,要屏蔽掉对自身的@信息
                if (author_id !== user._id) {
                        if(!reply_id){
                    saveMessage.saveAtMessage(article_id, author_id, user._id);
                        }else{
                     saveMessage.saveReplyAtMessage(article_id, author_id, user._id,reply_id) ;
                        }
                }
            })
        })
    },
    //查找里面的某人加入超链接
    // linkUser:
    linkUser:(content)=>{
          console.log('选择中...');
        // console.log(content);

        //    排除非法字符,以及邮箱
        let ignoreRegexs = [
            /```.+?```/g, // 去除单行的 ```
            /^```[\s\S]+?^```/gm, // ``` 里面的是 pre 标签内容
            /`[\s\S]+?`/g, // 同一行中，`some code` 中内容也不该被解析
            /^    .*/gm, // 4个空格也是 pre 标签，在这里 . 不会匹配换行
            /\b\S*?@[^\s]*?\..+?\b/g, // somebody@gmail.com 会被去除
            /\[@.+?\]\(\/.+?\)/g, // 已经被 link 的 username
        ]
        // 凡是匹配以上的验证规则的内容,被替换成''
        ignoreRegexs.forEach((item) => {
            //    replace(验证规则,新内容)
            content = content.replace(item, '');
        })
        //    console.log(content);
        // 获取@User User的验证规则/@[a-zA-Z0-9_]/
        let pattern = /@[a-zA-Z0-9_]+\b/igm;

        let results = content.match(pattern);
        let users = [];
        if (results) {
            results.forEach((result) => {
                users.push(result);
            })
        }
        // 得到重复用户的数组
        // console.log(users);
        // 进行数组排重,得到唯一的元素
        users = _.uniq(users);
        // console.log(users);

        return users;
    }

}

module.exports = at;
