<template>
    <div class="content">
      <x-header class="header">文章评论</x-header>
        <div class="con">
             <img v-if="item1.avatar" class="img" :src="'http://localhost:3000/uploads/'+item1.avatar" alt="">
            <img v-else class="img" :src="img" alt="">
           <section class="right">
           
            <h5 v-if="item1.name">{{item1.name}} </h5>
            <h5 v-else>{{item1.uname}}  </h5>
            <span>{{item.time}} 来自 [ {{item1.school}} ]</span>
           
             </section>
            <div class="con">
                <p>#<a :href="'#/cater/'+item.category">{{item.category}}</a>#  {{item.content}} </p>
                  <p><img src="" alt=""></p>
                  <p class="icon"> <a href="#/fabu"><i class="fa fa-share"> 分享</i></a>  <a :href="'#/commit/'+item._id"> <i class="fa fa-commenting-o">  评论</i></a>
                   <button @click="dian()" v-if="show2.indexOf(item._id) < 0" ><i class="fa fa-thumbs-o-up">  点赞 </i></button>
                  <button @click="dian()" v-if="show2.indexOf(item._id) >= 0" ><i style="color:blue" class="fa fa-thumbs-o-up">  点赞 </i></button>

                   <a :href="'#/commit/'+item._id">浏览次数{{item.click_num}}</a>
                  </p>
            </div>

        </div>
        <div class="commit">
        
            <!-- *********评论内容************** -->
        <div class="con">
           <p class="pl">评论 {{replys.length}} 条</p>
          <div v-for=" (reply,index) in replys" :key="index" class="right commit">
                <!-- {{reply}} -->
             <img v-if="reply.author.avatar" class="img" :src="'http://localhost:3000/uploads/'+reply.author.avatar" alt="">
            <img v-else class="img" :src="img" alt="">

            <!-- 二级回复 -->
             <p class="icon2" ><i @click="SecCom(index)" class="fa fa-commenting"></i></p>

           <section class="com">
       
            <h5 v-if="reply.author.name ">{{reply.author.name}} (第 {{index + 1}} 楼)</h5>
            <h5 v-else>{{reply.author.uname}} (第 {{index + 1}} 楼)  </h5>
           
            <span> 来自 [ {{reply.author.school}} ]</span>
            <p class="cont">{{reply.content}}  </p>
            </p>
             </section>
             <!-- 二级回复显示的评论框 -->
             <p v-if="icon==index"> <x-textarea :max="100" name="reply" v-model="RepCon"  required :placeholder="('添加评论')"></x-textarea>
              <br>
              <button class="btnRe" @click="ComReply(index)">评论</button>
             </p>
             <!-- 二级评论回复 -->
              <div style="color:#666" v-for="(item,index) in comments" :key="index" class="right commit">
             <div v-if="reply._id == item.reply_id">
              <img style="width:40px;height:40px;" v-if="item.author.avatar" class="img" :src="'http://localhost:3000/uploads/'+item.author.avatar" alt="">
              <img v-else class="img" :src="img" alt="">
              <!-- 显示 -->
                   <section class="com">
       
            <h5 v-if="item.author.name ">{{item.author.name}} </h5>
            <h5 v-else>{{item.author.uname}}   </h5>
           
            <span> 来自 [ {{item.author.school}} ]</span>
            <p class="cont">{{item.content}}  </p>
            </p>
             </section>
 
             </div>
            </div>

         </div>

        </div>
        <div class="input">
          <x-textarea :max="100" name="description" v-model="commit"  required :placeholder="('添加评论')"></x-textarea>
           <!-- <input class="contnt" type="text" v-model="commit"> -->
           <button @click="btn" class="btn">评论</button>
        </div>
         

        </div>

    </div>
</template>

<script>
import axios from "axios";
import img1 from "../assets/tushu.jpg";
import { XTextarea, Group, XInput, Checker, CheckerItem, XHeader  } from "vux";
import { WechatEmotion as Emotion, Divider } from 'vux'
export default {
  data() {
    return {
      
      item: {},
      img: img1,
      item1: {},
      commit:'',
      replys:[],
      show2:[],
      icon:'',
      RepCon:'',
      comments:[]
 
    };
  },
  components: {
    XTextarea,
    Group,
    XInput,
    Checker,
    CheckerItem,
    XHeader,
    Emotion, 
    Divider
  },
  mounted() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "fetchData"
  },
  methods: {
    onEvent(event) {
      console.log("on", event);
    },
    onItemClick(value, disabled) {
      // console.log(value, disabled);
      if (!this.disabled) {
        this.showPopup = false;
      }
    },
    fetchData() {
      var id = this.$route.params.id;
     
      axios.get("/host/commit/" + id)
        .then(resData => {
        //  console.log(resData.data)
          this.item = resData.data.data;
          this.item1 = resData.data.data.author;
          this.replys = resData.data.replys;
            this.show2 = resData.data.user;
            this.comments = resData.data.comments;

        })
        .catch(error => {
          console.log(error);
        });
    },
    btn:function(){
      var id = this.$route.params.id;
      var content = this.commit;
     
      axios.post("/host/commit/" + id ,{
        content:content
      }).then((resData)=>{
            // console.log(resData.data)
        if(resData.data.error==0){
           location.reload();
        }

      }).catch((error)=>{
        console.log(error)
      })
    },
    dian:function(){
        var id =  this.item._id

        if(this.show2.indexOf(id) < 0){

          axios.post('/host/dian',{
          id:id
         }).then((resData)=>{
        // 判断点赞显示的条件
        //  console.log(resData.data.data)
         this.show2 = resData.data.data;
          location.reload()
         }).catch((error)=>{
          console.log(error);
          })
       }else{
          axios.post('/host/defdian',{
          id:id
         }).then((resData)=>{

        //  console.log(resData.data)
             location.reload()
         }).catch((error)=>{
          console.log(error);
          })
       }
    
    },
    //提交框的选中评论
    SecCom:function(index){
        this.icon = index
    },
    ComReply:function(index){
            // console.log(index);
             var obj = {}
         obj.ReplyId = this.replys[index]._id;
        obj.ArtId = this.item._id;
        if(this.replys[index].author.name ){
              obj.reply_author = this.replys[index].author.name; 
        }else{
           obj.reply_author = this.replys[index].author.uname;
        }

        
        // console.log(this.RepCon);
        obj.RepCon = this.RepCon;
        axios.post('/host/reply/commit',obj).then((resData)=>{
                // console.log(resData.data)
                location.reload();
        }).catch((error)=>{
          console.log(error);
        })


    }

  }
};
</script>


<style scoped>
.content{
  background: #eee;
}
.fircon {
  width: 100%;
  margin: 50px auto;
}
.img {
  width: 50px;
  height: 50px;
  margin: 10px;
  border-radius: 50%;
}
.con {
  width: 100%;
  overflow: hidden;
  border: solid 1px #eee;
  /* margin: 10px; */
  background: white;
  padding: 10px;
  font-size: 14px;
}
.con .img {
  display: block;
  float: left;
}
.con .right {
  float: left;
  padding: 10px;
  width: 80%;
  /*  */
}
.con .right h5 {
  /* width: 40px; */
  margin: 0;
  padding: 0;
  font-weight: normal;
}
.con .right span {
  color: #aaa;
  font-size: 12px;
}
.con .icon {
  border: solid 1px #eee;
  line-height: 30px;
}
.con .icon a {
  display: block;
  width: 24%;

  float: left;
  text-align: center;
  color: #aaa;
}
.pl{
  line-height: 30px;
  border-bottom: solid 1px #eee;
  padding: 10px;
  font-size: 16px;
}
.input{
 
  margin: 15px 0;
  padding: 15px;
  text-align: center;
  background: white;
  line-height: 40px;
}
.contnt{
  line-height: 20px;

}
.btn{
  border: none;
  display: block;
  line-height: 34px;
  width: 100%;
  border-radius: 10px;
  margin: 8px;
  background: darkcyan;
}
.com{
  padding: 15px  20px;
}
.cont{
  margin: 10px;
}
.icon button {
  /* display: block; */
  border: none;
  width: 24%;
  line-height: 24px;
}
.icon2{
  /* width: 10px; */
  float: right;
  margin-right:-50px; 
  color: darkcyan;
  cursor: pointer;
  
}
.btnRe{
  display: block;
  width: 50%;
  margin: 0 auto;
  border: none;
  line-height: 30px;
  background: darkcyan;
  border-radius: 12px;
  /* text-align: center; */
}

</style>
