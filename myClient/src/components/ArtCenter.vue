<template>
    <div class="content">
        <!-- <x-header>{{item}}</x-header> -->
        <x-header>个人中心</x-header>
    
    <!-- ********文章显示************** -->
    <!-- 该模版若有文章则显示 -->
            <div class="con" v-if=" count.length > 0">
                <div class="con" v-for=" (item , index) in count" :key="index">
         <img v-if="item.author.avatar" class="img" :src="'http://localhost:3000/uploads/'+item.author.avatar" alt="">
            <img v-else class="img" :src="img" alt="">
                       

           <section class="right">
            <h5 v-if="item.author.name">{{item.author.name}}</h5>
            <h5 v-else>{{item.author.uname}}  </h5>
            <span> {{item.time}} 来自[ {{item.author.school}} ]</span>
               <!--
                             转发文章的显示 
                              -->
                  <p v-if="item.share_article"><span>转发了
                     <!-- {{item.article_author}} -->
                     <a v-if="item.article_author.name" href="">@{{item.article_author.name}}</a>
                     <a v-else href="">@{{item.article_author.uname}}</a>
                     </span>
                      {{item.share_article.content}}</p>


             </section>
              <p @click="delte(index)" class="Icon"><i style="color:green"  class="fa fa-trash-o"></i></p>
             <!-- 编辑 -->
               <p class="Icon"> <a :href="'#/edit/'+item._id"><i style="color:green;"  class="fa fa-cog"></i></a></p>
            
              <div class="con">
                <p>#<a :href="'#/cater/'+item.category">{{item.category}}</a>#  {{item.content}} </p>
                  <p><img src="" alt=""></p>
                  <p class="icon">  <a :href="'#/share/'+item._id "><i class="fa fa-share"> 转发</i></a>   <a :href="'#/commit/'+item._id"> <i class="fa fa-commenting-o">  评论</i></a>
                    <a :href="'#/commit/'+item._id">浏览次数{{item.click_num}}</a>
                   </p>
            </div>

          </div>
                    <!-- {{}} -->
            </div>
                <!-- 若无 -->
            <div class="com" v-else>
            <p><h1>你还没有还没有发表文章,请添加</h1></p>
            </div>


    </div>
</template>

<script>
import img1 from "../assets/tushu.jpg";
import axios from "axios";
import { XHeader ,Confirm} from "vux";
export default {
  data: function() {
    return {
      img: img1,
      count: "",
      show:false,
    };
  },
  components: {
    XHeader,
    Confirm
  },
  mounted: function() {
    axios
      .get("/host/user/article")
      .then(resData => {
        
        this.count = resData.data.data;
       
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
   
    delte: function(index) {
   
    var params = this.count[index];
    
    axios.post('/host/del/article',params).then((resData)=>{
        console.log(resData.data);
        location.reload();

    }).catch((error)=>{
            console.log(error)
    })


    },
   


  }
};
</script>
<style scoped>
.nav {
  width: 100%;
  line-height: 30px;
  overflow: hidden;
  padding: 15px;
  text-align: center;
}
.nav h4 {
  margin: 0;
  padding: 0;
}
.nav .btn {
  width: 20%;
  border: none;
  line-height: 20px;
  padding: 3px;
}
.com {
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
.Icon {
  text-align: center;
  float: right;
  margin: 0 10px;
}
.Icon i {
  color: black;
}
</style>