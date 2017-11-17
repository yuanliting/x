<template>
       
    <div class="content">
       <header-con class="he"></header-con>
        <div class="header" style="height:44px;">
      <sticky  ref="sticky" :offset="46" :check-sticky-support="false">
        <tab :line-width="1">
          <tab-item  selected> <span @click="xaun1"> 校内信息</span> </tab-item>
          <tab-item> <span @click="xaun2">校外江湖</span></tab-item>
        </tab>
      </sticky>
    </div>
    <!--  -->
       <div  v-if="show" class="fircon">
         <!-- {{shool}} -->
          <div class="con" v-for=" (item , index) in shool" :key="index">
           
            <img v-if="item.author.avatar" class="img" :src="'http://localhost:3000/uploads/'+item.author.avatar" alt="">
            <img v-else class="img" :src="img" alt="">
           <section class="right">
            <h5 v-if="item.author.name">{{item.author.name}}</h5>
            <h5 v-else>{{item.author.uname}}  </h5>
            <span> {{item.time}} 来自[ {{item.author.school}} ]</span>
             </section>
            <div class="con">
                <p>#<a :href="'#/cater/'+item.category">{{item.category}}</a>#  {{item.content}} </p>
                   <!--
                             转发文章的显示 
                              -->
                             
                  <p v-if="item.share_article"><span>转发了
                     <!-- {{item.article_author}} -->
                     <a v-if="item.article_author.name" href="">@{{item.article_author.name}}</a>
                     <a v-else href="">@{{item.article_author.uname}}</a>
                     </span>
                      {{item.share_article.content}}</p>
                  <p class="icon"> 
                    <!-- 分享 -->
                    <a :href="'#/share/'+item._id "><i class="fa fa-share"> 转发</i></a> 
                     <a :href="'#/commit/'+item._id"> <i class="fa fa-commenting-o">  评论</i></a>
                 <!-- 测试作用 1  -->

                          
                  <button @click="dian(index)" v-if="show2.indexOf(item._id) < 0" ><i class="fa fa-thumbs-o-up">  点赞 </i></button>
                  <button @click="dian(index)" v-if="show2.indexOf(item._id) >= 0" ><i style="color:blue" class="fa fa-thumbs-o-up">  点赞 </i></button>
                   <a :href="'#/commit/'+item._id">浏览次数{{item.click_num}}</a>
                  </p>
            </div>

          </div>

       </div>

       <div v-if="show1" class="fircon">
           <div class="con" v-for=" (item , index) in border" :key="index">
             <img v-if="item.author.avatar" class="img" :src="'http://localhost:3000/uploads/'+item.author.avatar" alt="">
            <img v-else class="img" :src="img" alt="">
           <section class="right">
            <h5 v-if="item.author.name">{{item.author.name}}</h5>
            <h5 v-else>{{item.author.uname}}  </h5>
            <span> {{item.time}} 来自[ {{item.author.school}} ]</span>
             </section>
            <div class="con">
            
                <p>#<a :href="'#/cater/'+item.category">{{item.category}}</a>#  {{item.content}} </p>
                           <!--
                             转发文章的显示 
                              -->
                  <p v-if="item.share_article"><span>转发了
                     <!-- {{item.article_author}} -->
                     <a v-if="item.article_author.name" href="">@{{item.article_author.name}}</a>
                     <a v-else href="">@{{item.article_author.uname}}</a>
                     </span>
                      {{item.share_article.content}}</p>
                  <p class="icon"> 
                    <!-- 分享 -->
                    <a :href="'#/share/'+item._id "><i class="fa fa-share"> 转发</i></a>  <a :href="'#/commit/'+item._id"> <i class="fa fa-commenting-o">  评论</i></a> 
                 <!-- 测试  2 -->
                 
                 
                  <button @click="dian(index)"  v-if="show2.indexOf(item._id) < 0" ><i class="fa fa-thumbs-o-up">  点赞 </i></button>
                  <button @click="dian(index)"  v-if="show2.indexOf(item._id) >= 0"><i class="fa fa-thumbs-o-up">  点赞 </i></button>
                 
                 
                  <a :href="'#/commit/'+item._id">浏览次数{{item.click_num}}</a>
                  </p>
            </div>

         </div>

       </div>
       <p class="fiex"> <a href="#/fabu"> <x-icon  type="ios-plus" size="50"></x-icon></a></p>


<!-- ******************************ceshi**************************** -->
 <tabbar class="footer">
      <tabbar-item selected link="/shouye"  >
        <!-- <img slot="icon" src="../assets/demo/icon_nav_button.png"> -->
        <i  slot="icon"  class="fa fa-star-o"></i>    
        <span slot="label">{{('动态')}}</span>
      </tabbar-item>
      <tabbar-item  link="/seccon" show-dot>
        <!-- <img slot="icon" src="../assets/demo/icon_nav_msg.png"> -->
        <i slot="icon" class="fa fa-heart-o"></i>
        <span  slot="label">{{('关注模版')}}</span>
      </tabbar-item>
      <tabbar-item link="/thidcon">
      
        <!-- <div> -->
        <i slot="icon" class="fa fa-cube"></i>
        <span slot="label">{{('杂谈信息')}}</span>
        <!-- </div> -->
      </tabbar-item>
      <tabbar-item  link="/forcon">
        <!-- <img slot="icon" src="../assets/demo/icon_nav_cell.png"> -->
        <i slot="icon" class="fa fa-user-o"></i>
        <span slot="label">{{('我的')}}</span>
      </tabbar-item>
    </tabbar>
    </div>
</template>

<script>
import axios from "axios";
import img1 from "../assets/tushu.jpg";
// import { Tab, TabItem, Sticky } from "vux";
import {
  Search,
  Group,
  Cell,
  XButton,
  ButtonTab,
  ButtonTabItem,
  Tabbar,
  TabbarItem,
  Tab,
  TabItem,
  Sticky
} from "vux";
import HeaderCon from "../components/HeaderCon";
// import FooterCon from "../components/FooterCon";
export default {
  data() {
    return {
      show: true,
      img: img1,
      cat1: ["好店推荐", "兼职信息", "优惠活动", "旅游组团", "吃货频道"],
      shool: [],
      border: [],
      show1: false,
      num: 0,
      Count:1,
      //判断用户是否已经点赞
      show2: []
    };
  },
  // prop :['badge'],
  components: {
    Search,
    Group,
    Cell,
    XButton,
    ButtonTab,
    ButtonTabItem,
    Tabbar,
    TabbarItem,
    HeaderCon,
    Tab,
    TabItem,
    Sticky
  },
  methods: {
    xaun1: function() {
      this.show = true;
      this.show1 = false;
    },
    xaun2: function() {
      this.show1 = true;
      this.show = false;
    },
    dian: function(index) {
      // 获取当前文章的id,school为所有文章的数组集合
      var id = this.shool[index]._id;
      // 判断当前文章是否被点赞,
      if (this.show2.indexOf(id) < 0) {
        // 点赞请求
        axios
          .post("/host/dian", {
            id: id
          })
          .then(resData => {
            // 判断点赞显示的条件
            //  console.log(resData.data.data)
            this.show2 = resData.data.data;
            location.reload();
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        // 取消点赞请求
        axios
          .post("/host/defdian", {
            id: id
          })
          .then(resData => {
        
            location.reload();
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  mounted: function() {
    var that = this;
    // console.log(that.num)
    axios
      .get(`/host/show/?limit=${that.Count}`)
      .then(resData => {
        // 判断是否为校外消息 还是校内消息
        // console.log(resData.data)
        this.num = resData.data.num;
        this.show2 = resData.data.user.follows;
        var arr1 = this.cat1;
        var arr2 = [];
        var arr3 = [];
        resData.data.data.forEach(function(item, ins) {
          // console.log(this)
          arr1.forEach(function(arr, index) {
            // console.log
            if (arr == item.category) {
              arr2.push(item);
              resData.data.data.splice(ins, 1);
            }
          });
        });
        arr3 = resData.data.data;

        this.shool = arr3;
        this.border = arr2;
        // 加载更多..************************.....
        var isMore = false;
        //滚动加载更多...
        window.onscroll = function() {
          // 获取body内容的高度
          var height = document.body.clientHeight;
          // 滚动偏移量
          var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          // 获取饰扣/窗口的高度
          var windowH = window.innerHeight;
                    // console.log(scrollTop + windowH > height - 10)
          if (scrollTop + windowH > height - 10) {
            // console.log(isMore)
            if (!isMore) {
              isMore = true;
             
             that.Count+= that.Count
              axios.get(`/host/show/?limit=${that.Count}`).then(resData => {
                //判断是否为校外消息,还是校内消息
                console.log(resData.data)
                that.num = resData.data.num;
                that.show2 = resData.data.user.follows;
                var arr1 = that.cat1;
                var arr2 = [];
                var arr3 = [];
                resData.data.data.forEach(function(item, ins) {
                  
                  arr1.forEach(function(arr, index) {
                  
                    if (arr == item.category) {
                      arr2.push(item);
                      resData.data.data.splice(ins, 1);
                    }
                  });
                });
                arr3 = resData.data.data;
                that.shool = arr3;
                that.border = arr2;
                isMore = false;

              });
            }
          }
        };
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
/* .content{
  background: #eee;
} */
.he {
  position: fixed;
  top: 0;
  width: 100%;
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
  width: 24%;

  float: left;
  text-align: center;
  color: #aaa;
}

.vux-x-icon {
  fill: #f70968;
}
.cell-x-icon {
  display: block;
  fill: green;
}
.fiex {
  position: fixed;
  bottom: 80px;
  right: 50px;
}
.footer {
  position: fixed;
  bottom: 0px;
}
.icon button {
  /* display: block; */
  border: none;
  width: 24%;
  line-height: 24px;
}
</style>
