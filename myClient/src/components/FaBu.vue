<template>
    <div class="content">
<x-header class="header">发布文章</x-header>
      <!-- <h2>发布文章</h2>  -->
      <x-input v-model="title" :placeholder="('标题')"  required></x-input>
      <x-textarea :max="300" name="description" v-model="content"  required :placeholder="('发表内容')"></x-textarea>
         <button class="btn" @click="fabu">发布</button>     
         <p v-if="show" class="tip">标题/内容不能为空</p>
    <!--  标签分类 -->
    <div class="box">
      <checker v-model="demo1" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
      <checker-item :value= "index"  v-for="(item,index) in datas"  :key="index"  >{{ item.name }}</checker-item>
      <!-- <checker-item value="2">{{ ('校外信息') }}</checker-item> -->
      </checker>
      <br>
      <!-- <span>{{ ('Current value is') }}: {{ demo1 }}</span> -->
      <br>
<!-- 小标签分类 -->
     <div v-if="!demo1" class="box">
       <checker v-model="demo1Checkbox" type="checkbox"    default-item-class="demo1-item" selected-item-class="demo1-item-selected"  :max=1>
      
        <checker-item class="icon" v-for="(item, index) in datas[0].datas"  :key="index" :value="index">{{ item }}</checker-item>
     
      </checker>
      <br>
     
      <br>
    </div>
    <!-- 校外 -->
     <div v-if="demo1" class="box">
       <checker v-model="demo1Checkbox1" type="checkbox"    default-item-class="demo1-item" selected-item-class="demo1-item-selected"  :max=1>
        <checker-item class="icon" v-for="(item, index) in datas[1].datas"  :key="index" :value="index">{{ item }}</checker-item>
       
      </checker>
      <br>
    
      <br>
    </div>

    </div>
    
    </div>
</template>

<script>
import axios from 'axios';
import { XTextarea, Group, XInput, Checker, CheckerItem, XHeader } from "vux";
export default {
  data() {
    return {
      content: "",
      title: "",
      //   大分类
      demo1: 0,
      // 小分类

      demo1Checkbox: [],
      demo1Checkbox1:[],
      show:false,

      //   总数据
      datas: [
        {
          name: "校内频道",
          datas: [
            "吃货餐厅",
            "学校门派",
            "校园景色",
            "建筑分布",
            "宿舍条件",
            "录取条件",
            "考研资料共享",
            "难题解答",
            "知识百科交流",
            "原创小说",
            "技能学习",
            "专业知识分享",
            "社团活动时间",
            "校内活动",
            "爱好加盟",
            "平常爱好交流",
            "闲置交通工具交换",
            "外出旅游设备交换",
            "校内物品交换",
            "资料图书交换",
            "课程信息",
            "考试",
            "活动",
            "物品交换",
            "娱乐八卦",
            "游戏竞技"
          ]
        },
        { name: "校外江湖", datas: ["好店推荐", "兼职信息", "优惠活动", "旅游组团", "吃货频道"] }
      ]
    };
  },
  components: {
    XTextarea,
    Group,
    XInput,
    Checker,
    CheckerItem,
     XHeader
  },
  methods: {
    onEvent(event) {
      console.log("on", event);
    },
    onItemClick(value, disabled) {
      console.log(value, disabled);
      if (!this.disabled) {
        this.showPopup = false;
      }
    },
    fabu:function(){
       
            if(!this.title){
               return   this.show = ! this.show   
            }
            if(!this.content){
               return  this.show = ! this.show  
            }
            var parmas = {};
            parmas.title = this.title;
            parmas.content = this.content;
           
        // var obj = this.datas;
        var demo1 = this.demo1;

        if(demo1==0){
             parmas.category = this.datas[demo1].datas[this.demo1Checkbox[0]]
        }else{
             parmas.category = this.datas[demo1].datas[this.demo1Checkbox1[0]]
        }
        // console.log(parmas);
    axios.post('/host/fabu',parmas).then((resData)=>{
                    // console.log(resData)
                    location.href = '#/shouye'
    }).catch((error)=>{
            console.log(error)
    })
       


    },
  }
};
</script>


<style scoped>
/* .header{
    margin-top: 10px;
} */
.box {
  padding: 0 15px;
}
.demo1-item {
  border: 1px solid #ececec;
  padding: 5px 15px;
  border-radius: 15px;
  font-size: 12px;
}
.demo1-item-selected {
  color: #333;
  background: #d8ffd8;
}

.icon {
  width: 24%;
  margin: 5px auto;
  /* color: red; */
}
.btn{
    display: block;
    width: 35%;
    margin: 10px auto;
    line-height: 30px;
    border: none;
    background: darkorchid;
    border-radius: 20px;
    color: white;
}
.tip{
    width: 40%;
    margin: 15px auto;
    color: red;
    
}
</style>
