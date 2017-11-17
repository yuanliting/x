<template>
    <div class="content">
       <x-header class="header">我的资料</x-header>
       
       <section @click="linAn" class="fir table">
           <p class="left">头像</p>
           <img class="img" :src="'http://localhost:3000/uploads/'+img" alt="">
           
       </section>
        <p class="auto">基本资料</p>
       <section class="sec table">
       
       <div class="name">
         <p>姓名</p>  <input class="right" type="text" v-model="name " placeholder="(未填写)" ref="input1">
        </div>
       <div class="name">
            <p>性别</p>  <input class="right" type="text" v-model="sex" ref="input2">
       </div>
      
       </section>
       <group class="basic">
           <datetime v-model="value1" @on-change="change" :title="('生日')"></datetime>
        <x-address title="地址" v-model="value4" raw-value :list="addressData" hide-district></x-address>
       </group>
       
        <p class="auto">学籍资料</p>
       <section class="three table">
         
          <div class="name">
         <p>学校</p>  <input class="right" type="text" v-model="school" ref="input3">
        </div>
        <div class="name">
         <p>院系</p>  <input class="right" type="text" v-model="acad" ref="input4">
        </div>
        <div class="name">
         <p>专业</p>  <input class="right" type="text" v-model="zhuanye"  placeholder="(未填写)" ref="input5">
        </div>
        <div class="name">
         <p>学历</p>  <input class="right" type="text" v-model="education" placeholder="(未填写)" ref="input6">
        </div>
        <div class="name">
         <p>入学年份</p>  <input class="right" type="text" v-model="age" placeholder="(未填写)" ref="input7">
        </div>
          
       </section>
        <p class="auto" style="border:none">个性资料</p>
       <section class="for  table">
        <div class="name">
         <p>个性签名</p>  <input class="right" type="text" placeholder="(未填写)" v-model="motto"  ref="input8">
        </div>
        <div class="name">
         <p>兴趣爱好</p>  <input class="right" type="text" placeholder="(未填写)" v-model="fav"  ref="input9">
        </div>
        <div class="name">
         <p>近期动向</p>  <input class="right" type="text" placeholder="(未填写)" v-model="attion" ref="input10">
        </div>
        
        
       </section>
       <button @click="btnClick"  class="submit">确认修改</button>
    </div>
</template>

<script>
import axios from "axios";
import img1 from "../assets/logo.png";
import {
  XHeader,
  Datetime,
  XAddress,
  ChinaAddressV4Data,
  Group,
  Confirm
} from "vux";

export default {
  data() {
    return {
      // 生日
      value1: '',
      img:img1,
      // 地址
      value4: [],
      addressData: ChinaAddressV4Data,
      show: false,
      files: [],
      school: "河南科技学院",
      acad: "信息工程系",
      //专业
      zhuanye: '',
      // 昵称
      name: '',
      // 年份
      age: '',
      // 本科
      education: '',
      // 兴趣
      fav: '',
      // 动向
      attion: '',
      // 地址
      // address:'',
      //生日
      //  birthday:'',
      sex: '',
      motto: ''

      
    };
  },
  components: {
    XHeader,
    Datetime,
    XAddress,
    ChinaAddressV4Data,
    Group,
    Confirm
  },
  methods: {
    change(value) {
      console.log("change", value);
    },
    linAn:function(){
          location.href="#/change";

    },
    btnClick: function(){
      // console.log(this.sex);
      var params = {};
      params.school = this.school;
      // console.log(this.shool)
      params.acad = this.acad;
      params.age = this.age;
      params.education = this.education;
      params.motto = this.motto;
      params.name = this.name;
      params.birthday = this.value1;
      params.address = this.value4;
      params.zhuanye = this.zhuanye;
      params.fav = this.fav;
      params.attion = this.attion;
      params.sex = this.sex;
      axios
        .post("/host/upload", params)
        .then(resData => {
          // console.log(resData.data);
          location.reload();
        })
        .catch((error) => {
          console.log(error)
        });
    },
      
  },
  mounted: function() {
    axios
      .get("/host/userCenter")
      .then(resData => {
        console.log(resData.data.data);
        var data = resData.data.data;
        this.school = data.school;
        this.acad = data.acad;
        this.age = data.age;
        this.education = data.education;
        this.motto = data.motto;
        this.name = data.name;
        this.value1 = data.birthday;
        this.value4 = data.address;
        this.sex = data.sex;
        this.value1 = data.birthday;
        this.value4 = data.address;
        this.zhuanye = data.zhuanye;
        this.fav = data.fav;
        this.attion = data.attion; 
        this.img = data.avatar;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.content {
  width: 100%;
  background: #eee;
}
.table {
  width: 100%;
  margin: 0px auto;
  overflow: hidden;
  padding: 8px 16px;
  background: white;
}

.left {
  float: left;
  line-height: 40px;
  width: 50px;
}
.img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  float: right;
}
.fir {
  margin: 0;
  margin-bottom: 20px;
  line-height: 30px;
}
.auto {
  background: white;
  padding: 15px;
  border: solid 1px #eee;
  color: #aaa;
  font-size: 14px;
}
.name {
  width: 100%;
  overflow: hidden;
  border-bottom: solid 1px #eee;
  padding: 10px;
}
.name p {
  float: left;
  line-height: 30px;
  margin: 0;
}
.name .right {
  float: right;
  line-height: 30px;
  border: none;
  text-align: center;
}
.basic {
  margin: 0;
}
.submit {
  width: 100%;
  display: block;
  line-height: 30px;
  margin-bottom: 20px;
  border: none;
  background: blue;
  color: white;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
}
</style>