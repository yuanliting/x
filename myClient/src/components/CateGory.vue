<template>
    <div class="content">
        <x-header>{{item}}</x-header>
     <!-- <h5>标题页面</h5> -->
     <div class="nav" v-if="show">
         <h4>{{item}}</h4><button @click="btnClick" class="btn"> + 关注</button>
     </div>
     <div class="nav" v-if="!show">
         <h4>{{item}}</h4><button @click="btnClick " class="btn"> 已关注</button>
        
     </div>
    <!-- ********文章显示************** -->
    <!-- 该模版若有文章则显示 -->
            <div class="con" v-if=" count.length > 0">
                <div class="con" v-for=" (item , index) in count" :key="index">
            <img class="img" :src="img" alt="">
           <section class="right">
            <h5 v-if="item.author.name">{{item.author.name}}</h5>
            <h5 v-else>{{item.author.uname}}  </h5>
            <span> {{item.time}} 来自[ {{item.author.school}} ]</span>
             </section>
            <div class="con">
                <p>#<a :href="'#/cater/'+item.category">{{item.category}}</a>#  {{item.content}} </p>
                  <p><img src="" alt=""></p>

                  <p class="icon">  <a :href="'#/share/'+item._id "><i class="fa fa-share"> 转发</i></a> 
                  
                   <a :href="'#/commit/'+item._id"> <i class="fa fa-commenting-o">  评论</i></a> 
                <!-- <a href=""><i class="fa fa-thumbs-o-up">  点赞 </i></a> -->
                
                
                 <a :href="'#/commit/'+item._id">浏览次数{{item.click_num}}</a>
                </p>


                 
            </div>

          </div>
                    <!-- {{}} -->
            </div>
<!-- 若无 -->
            <div class="com" v-else>
            <p><h1>该标签还没有文章,请添加</h1></p>
            </div>


    </div>
</template>

<script>
import img1 from "../assets/tushu.jpg";
import axios from 'axios';
import {XHeader} from 'vux';
export default {
  data: function() {
    return {
       item:'',
        show:true,
        count:[],
        img:img1,
        user:[]
    };
  },
  computed: {},
  components: {
        XHeader
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
      console.log(value, disabled);
      if (!this.disabled) {
        this.showPopup = false;
      }
    },
    fetchData() {
      var id = this.$route.params.name;
      // console.log(id)
      this.item = id;
      var that = this.show;
     
      axios.get("/host/cater/" + id)
        .then(resData => {
        //  console.log(resData.data)
         this.count = resData.data.data;
        this.user = resData.data.user;
      this.user.forEach((item,index) => {
            // console.log(item)
            if(item == id){
             this.show = false
            }
      });
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 关注模版****************************************待开发
    btnClick(){
        this.show = !this.show;
        var id = this.$route.params.name;
       
        if(!this.show){
           axios.get('/host/like/'+id).then((resData)=>{
          console.log(resData.data);

          }).catch((error)=>{
            console.log(error)
          })
        }else{
           axios.get('/host/defalike/'+id).then((resData)=>{
          console.log(resData.data);

          }).catch((error)=>{
            console.log(error)
          })
        }
       
    }
  }
}   
</script>
<style scoped>
.nav{
    width: 100%;
    line-height: 30px;
    overflow: hidden;
    padding: 15px;
     text-align: center;
}
.nav h4{
    margin: 0;
    padding: 0;
}
.nav .btn{
    width: 20%;
    border: none;
    line-height: 20px;
    padding: 3px;
}
.com{
    width: 100%;
    text-align: center;
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
  width: 30%;
  /* margin: 0 auto; */
  float: left;
  text-align: center;
  color: #aaa;
}
</style>