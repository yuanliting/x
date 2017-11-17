
const Message = require('../model/message');

exports.index = (req,res,next)=>{

        // console.log(req.session.user)
        var target_id  = req.session.user._id;
        // 所有的消息
    Message.getReadMsgs(target_id,(err,readMsgs)=>{
        if(err){
            return res.json({error:1,message:'系统错误'})
        }
        // console.log(readMsgs)
        if(!readMsgs){
            return res.json({error:1,message:'当前没有任何消息'})
        }
        console.log(readMsgs)
        // var article_id = readMsgs
        readMsgs.forEach((message,index) => {
                message.has_read = true;
                message.save();
                if(index === readMsgs.length - 1){
                    
                    res.json({error:0,message:'获取消息成功',data:readMsgs})
                }


        });



        

    })

}