<template>
    <div class="content">
      <!-- <header-con class="header"></header-con> -->
    <search class="header"
    @result-click="resultClick"
    @on-change="getResult"
    :results="results"
    v-model="value"
    position="realitive"
    auto-scroll-to-top top="0px"
    @on-focus="onFocus"
    @on-cancel="onCancel"
    @on-submit="onSubmit"
    ref="search"></search>
        <!--插件  -->
        <!--第一部分 -->
    <fir-con></fir-con>
    <!-- 第二部分 -->
  <!-- <sec-con></sec-con> -->
  <!-- 第三季部分 -->
  <!-- <three-con></three-con> -->
  <!-- 第四部分 -->
  <!-- <for-con></for-con> -->
    <!-- 底部 -->
     <tabbar class="footer">
      <tabbar-item link="/shouye"  selected >
      
        <i  slot="icon"  class="fa fa-star-o"></i>    
        <span slot="label">{{('动态')}}</span>
      </tabbar-item>
      <tabbar-item  link="/seccon" show-dot>
    
        <i slot="icon" class="fa fa-heart-o"></i>
        <span  slot="label">{{('关注模版')}}</span>
      </tabbar-item>
      <tabbar-item link="/thidcon">
      
      
        <i slot="icon" class="fa fa-cube"></i>
        <span slot="label">{{('杂谈信息')}}</span>
     
      </tabbar-item>
      <tabbar-item link="/forcon">
       
        <i slot="icon" class="fa fa-user-o"></i>
        <span slot="label">{{('我的')}}</span>
      </tabbar-item>
    </tabbar>
    <!-- <footer-con></footer-con> -->
    </div>
</template>

<script>
import { Search, Group, Cell, XButton, ButtonTab, ButtonTabItem,Tabbar,TabbarItem } from "vux";
import FirCon from '../components/FirCon';
import SecCon from '../components/SecCon';
import ThreeCon from '../components/ThreeCon';
import ForCon from '../components/ForCon';
import HeaderCon from '../components/HeaderCon';
import FooterCon from '../components/FooterCon';
export default {
  data: function() {
    return {
         results: [],
      value: '社团活动',
      demo01: 0,

    };
  },
  computed: {},
  components: {
     ButtonTab,
    ButtonTabItem,
    Search,
    Group,
    Tabbar,
    TabbarItem,
    Cell,
    XButton,
    FirCon,
    SecCon,
    ThreeCon,
    ForCon,
      HeaderCon,
    FooterCon
  },
  methods: {
        onFocus () {
      console.log('on focus')
    },
    onCancel () {
      console.log('on cancel')
    },
     resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      this.results = val ? getResult(this.value) : []
    },
     onSubmit () {
      this.$refs.search.setBlur()
      this.$vux.toast.show({
        type: 'text',
        position: 'top',
        text: 'on submit'
      })
    },
    consoleIndex () {
      console.log('click demo01', this.demo01)

    },
   
   
  }
};
function getResult (val) {
  let rs = []
  for (let i = 0; i < 20; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    })
  }
  return rs
}
</script>
<style scoped>
.content nav {
  width: 90%;
  margin: 8px auto;
  
}

.footer{
    position: fixed;
    bottom: 0px;
}


</style>