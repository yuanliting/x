<template>
    <div class="content">
    
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
      <tabbar-item link="/forcon">
        <!-- <img slot="icon" src="../assets/demo/icon_nav_cell.png"> -->
        <i slot="icon" class="fa fa-user-o"></i>
        <span slot="label">{{('我的')}}</span>
      </tabbar-item>
    </tabbar>
    </div>
</template>

<script>
import {  Group, Cell, XButton, ButtonTab, ButtonTabItem,Tabbar,TabbarItem } from "vux";

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
    // Search,
    Group,
    Tabbar,
    TabbarItem,
    Cell,
    XButton,
  
  
  },
  methods: {
 consoleIndex () {
      console.log('click demo01', this.demo01)

    },
  }
};

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