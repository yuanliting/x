<template>
    <div class="content">
            <div class="logo">
                <img src="../assets/logo.png" alt="">
            </div>
            <div class="form">
                <form action="">
                    
      <x-input  :max="13" v-model="uname" title="手机号码" name="uname" keyboard="number" is-type="china-mobile" required></x-input>
                <!-- <input v-model="uname" type="text"  placeholder="请输入你的手机号码" required><br> -->
                 <x-input title="请输入6-11位密码" type="password" placeholder="" v-model="password" :min="6" :max="11" required ></x-input>
            </form>
             <button @click="btnClick" class="btn">登录</button>
            <p class="thir"> <a class="fir" href="#/zhuce">马上注册</a>  | <a href="#/forget">忘记密码</a> </p>
            </div>

            <div>
                <p v-if="error" class="error">{{error}}</p>
                 <p class="vb">
                <divider>{{msg}} </divider>
            
            </p>
            <tabbar class="foot">
                <tabbar-item class="con">
                    <i  slot="icon"  class="fa fa-weixin icon"></i>
                    <span  slot="label">微信登录 </span>
                    </tabbar-item> 
                <tabbar-item class="con">
                    <i  slot="icon"  class="fa fa-weibo icon"></i>
                    <span slot="label">微博登录 </span>
                </tabbar-item>
                <tabbar-item class="con ">
                    <i  slot="icon"  class="fa fa-qq icon"></i>
                    <span  slot="label"> QQ登录</span>
                </tabbar-item>
                </tabbar>    
            </div>
    </div>
</template>

<script>
import { Actionsheet, Alert, Tabbar,Divider , XInput, TabbarItem } from "vux";
import axios from "axios";
export default {
  data: function() {
    return {
        uname:'',
        password:'',
        error:'',
        msg:'第三方登录'
    };
  },
  components: {
    Actionsheet,
    Alert,
    Tabbar,
    TabbarItem,
     XInput,
     Divider
  },
  methods: {
      btnClick:function(){
           var parmas = {
                uname:this.uname,
                password:this.password,
            }
            console.log(parmas)
            axios.post('/host/login',parmas).then((resData)=>{
                    console.log(resData.data)
                        
                      this.error = resData.data.message 
                      if(resData.data.error == 0){
                           location.href='#/shouye'
                      }
                   


            }).catch((err)=>{
                console.log(err)
            })
      }
  }
};
</script>

<style scoped>
.content{
    width: 100%;
    /* position: relative; */

}
.logo{
    width:100%;
    background: deepskyblue;
    overflow: hidden;
    height: 200px;
}
.logo img{
    width: 120px;
    height: 120px;
    border-radius: 30px;
    border: solid 2px white;
    margin: 40px auto;
    display: block;
}
.content .form{
    width: 100%;

}

 .foot{
     position: fixed;
     bottom:30px;
     background: white;
     
 }
.con span{
     font-size: 16px;
     text-decoration: none;
     color: #999999;
 }
.btn{
    width: 90%;
    line-height: 40px;
    border: none;
    background: dodgerblue;
    border-radius: 30px;
    margin: 30px auto;
    display: block;
    font-size:18px;
    color: white;
    padding: 10px;
}
.thir{
    width: 45%;
    margin: 0 auto;
}
.thir  a.fir{
    color: blue;
}
.thir a{
    color: black;

}
.vb{
width: 78%;
margin: 50px auto;
margin-top: 80px;

}

.error{
    width: 40%;
    margin:  0 auto;
    color: red;
}
</style>