<template>
    <div class="content">
        <div class="total">
       <nav>
           <h5>找回密码</h5>
           <!-- -->
       </nav>
       <div class="con">
           <p>请填写信息</p>
            <form action="">
                <x-input   should-toast-error :max="13" v-model="uname" title="手机号码" name="uname" keyboard="number" is-type="china-mobile" required></x-input>
              
                 <x-input title="输入新密码" type="password" placeholder="" v-model="password" :min="6" :max="11" required ></x-input>
                 <x-input title="请确认新密码" v-model="password2" type="password" placeholder="" :equal-with="password" required></x-input>
               
                
            </form>
         
       
       </div>
        <button ref="submit" class="submit" @click="btnClick">提交</button> 
       
            <p v-if="error" class="error">{{error}}</p>
             </div>
        <div class="foote">
            <span>找回密码时,请仔细阅读 << <a href="https://segmentfault.com/tos"> 服务条款 </a> >></span>
        </div>

        
    </div>
    
</template>

<script>
import axios from "axios";
import { XInput, Group, XButton, Cell } from "vux";
// 手机号正则表达式/^((133)|(149)|(153)|(17[3,7])|(18[0,1,5,2,9]))\\d{8}|(170[0-2])\\d{7}$/
export default {
    
  data: function() {
    return {
      datas: [
       
      ],
      uname:'',
      password:'',
      password2:'',
    
      error:''


    };
  },
  components: {
    XInput,
    Group,
    XButton,
    Cell
  },
  methods: {
        btnClick:function(){
           var password = this.password;
           var password2 = this.password2
           if(password != password2){
             return   this.error="两次输入密码不一致"
           }
            var parmas = {
                uname:this.uname,
                password:this.password,
               
            }
           
            axios.post('/host/forget',parmas).then((resData)=>{
               console.log(resData);    
                      this.error = resData.data.message 
                    
                //   location.href="#/";

            }).catch((err)=>{
                console.log(err)
            })
        },
        getClick:function(index){
                this.index = index;
               console.log(this.index)
        },
     change (val) {
    //   console.log('on change', val)
    },

  }
};
</script>

<style scoped>
.content {
  width: 100%;
}
.total{
    width: 80%;
    margin: 30px auto;
}
nav {
  width: 100%;
  overflow: hidden;
}
nav h5 {
  text-align: center;
  width: 82%;
  float: left;
  font-size: 16px;
}

.con p {
  width: 100%;
  background: darkseagreen;
  line-height: 40px;
  padding: 0 8px;
  border-radius: 15px;
  text-align: center;
  margin: 10px;
}


.content p.flow {
  width: 86%;
  margin: 20px auto;
  font-size: 14px;
}
.foote {
  width: 100%;
  background: #eee;
  line-height: 30px;
  position: fixed;
  bottom: 0;
  text-align: center;
  border-top: solid 1px #ddd;
  font-size: 12px;
}

.error{
    width: 80%;
    margin: 0 auto;
    color: red;
}
.submit{
    display: block;
    width: 100%;
    border-radius: 14px;
    line-height: 40px;
    border: none;
    margin: 15px;
}
</style>