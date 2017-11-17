<template>
    <div class="content">
       <nav>
           <h5>绑定手机号</h5>
           <button ref="submit" class="submit" @click="btnClick">提交</button>
       </nav>
       <div class="con">
           <p>输 入 手 机 号 / 密 码 ,完 成 注 册</p>
            <form action="">
                <x-input   should-toast-error :max="13" v-model="uname" title="手机号码" name="uname" keyboard="number" is-type="china-mobile" required></x-input>
                <!-- <input v-model="uname" type="text"  placeholder="请输入你的手机号码" required><br> -->
                 <x-input title="请输入6-11位密码" type="password" placeholder="" v-model="password" :min="6" :max="11" required ></x-input>
                 <x-input title="请确认6-11位密码" v-model="password2" type="password" placeholder="" :equal-with="password" required></x-input>
                <!-- <input class="input" v-model="password" type="password" placeholder="请设置6-16位密码" required> -->
                
            </form>
            <p>确 认 教 育 信 息</p>

       </div>
        <div class="select">
            <div v-for="(data,index) in datas" :key="index" >
                <span class="cather"  :value="index">{{data.name}}</span>
                
                <select class="sel" name="" id="" >
                   
                    <option   @click="getClick(ins)"  v-for="(item,ins) in data.data"  :key="ins" :value="ins">
                            {{item}}
                    </option>
                </select>
            </div>
            <div class="side">

            </div>
        </div>
    <p class="flow">注册后表示你同意<a href="https://segmentfault.com/tos">《表表使用条款与隐私政策》</a></p>
    <p v-if="error" class="error">{{error}}</p>
        <div class="foote">
            <span>已 有 超 表 账 号 , <a href="#/">点 击 去 登 录  >></a></span>
        </div>
    </div>
    
</template>

<script>
import axios from "axios";
import { XInput, Group, XButton, Cell } from "vux";
// 手机号正则表达式/^((133)|(149)|(153)|(17[3,7])|(18[0,1,9]))\\d{8}|(170[0-2])\\d{7}$/
export default {
    
  data: function() {
    return {
      datas: [
        { name: "学校", data: ["河南科技学院", "新乡医学院", "新乡学院", "河南职业技术学院", "河南师范大学"] },
        { name: "学院", data: ["信息工程学院", "外国语学院", "机电学院", "食品工程学院", "数学学院"] },
        { name: "学年", data: ["2017年", "2016年", "2015年", "2014年", "2013年"] },
        { name: "学历", data: ["本科/专科", "研究生", "博士"] }
      ],
      uname:'',
      password:'',
      password2:'',
      index:0,
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
                school:this.datas[0].data[this.index],
                acad:this.datas[1].data[this.index],
                age:this.datas[2].data[this.index],
                education:this.datas[3].data[this.index],

            }
            // console.log(parmas)
            axios.post('/host/zhuce',parmas).then((resData)=>{
                    console.log(resData.data)
                    if(resData.data.error == 1){
                      this.error = resData.data.message 
                    } 
                    if(resData.data.error == 0){
                        location.href="#/";
                    }
                  // location.href="#/";

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
nav button {
  background: white;
  color: blue;
  border: none;
  font-size: 16px;
  float: right;
  display: block;
  margin: 10px;
  margin-top: 24px;
}
.con p {
  width: 100%;
  background: darkseagreen;
  line-height: 40px;
  padding: 0 8px;
  font-size: 14px;
}

.select {
  width: 94%;
  margin: 0 auto;
  position: relative;
}
.select .side {
  width: 30px;

  height: 210px;
  position: absolute;
  top: 0;
  background: white;
  right: 30px;
}
.sel {
  width: 80%;
  height: 50px;
  font-size: 16px;
  padding-left: 50px;
  border: none;
  border-bottom: solid 1px #ccc;
}
.content p.flow {
  width: 86%;
  margin: 20px auto;
  font-size: 14px;
}
.foote {
  width: 100%;
  background: #eee;
  line-height: 60px;
  position: fixed;
  bottom: 0;
  text-align: center;
  border-top: solid 1px #ddd;
}
.foote a,
.flow a {
  color: deepskyblue;
}
.error{
    width: 80%;
    margin: 0 auto;
    color: red;
}
</style>