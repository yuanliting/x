<template>
  <div id="app">
    <router-view></router-view>

   

  </div>
</template>

<script>
import axios from "axios";
//vux是一个vux的移动端组件库，其中包含数十个组件，在页面组件中需要使用这些组件时，可以选择性导入。

import {Tabbar,TabbarItem} from 'vux';

export default {
  name: 'app',
  components:{
    Tabbar,
    TabbarItem
  }
}
</script>

<style>
  
</style>
