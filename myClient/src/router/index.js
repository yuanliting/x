import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from "@/pages/Home.vue";
import Friend from "@/pages/ZhuCe.vue";
import Active from "@/pages/Active.vue";
import radio from "@/components/radio.vue";
import UserCenter from '@/pages/UserCenter.vue';
import FirCon from '@/components/FirCon.vue';
import SecCon from '@/components/SecCon.vue';
import ThreeCon from '../components/ThreeCon';
import ForCon from '@/components/ForCon.vue';
import FaBu from '@/components/FaBu.vue';
import ComMit from '@/components/ComMit.vue';
import CateCory from '@/components/CateGory.vue';
import ArtCenter from '@/components/ArtCenter.vue';
import ChanImg from '@/components/ChanImg.vue';
import ForGet from '@/components/ForGet.vue';
import MessAge from '@/components/MessAge.vue';
import ResTig from "@/pages/ResTig.vue";
import ErrorMes from "@/components/ErrorMes.vue";
import EditArt from "@/components/EditArt.vue";
import ShareCon from "@/components/ShareCon.vue";
export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    // cesi代码**************************
    {
      path: '/zhuce',
      component: ResTig
    },
    {
      path: '/shouye',
      component: FirCon
    },
    {
      path: '/radio',
      component: radio
    },
    {
      path:'/logout',
      component:Home
    },
    {
      path:'/userCenter',
      component:UserCenter

    },
    {
      path:'/fircon',
      component:FirCon
    },
    {
      path:'/seccon',
      component:SecCon
    },
    {
      path:'/thidcon',
      component:ThreeCon
    },
    {
      path:'/forcon',
      component:ForCon
    },
    {
      path:'/fabu',
      component:FaBu
    },
    {
      path:'/commit/:id',
      component:ComMit
    },
    {
      path:'/cater/:name',
      component:CateCory
    },
    {
      path:'/user/article',
      component:ArtCenter
    },
    {
      path:'/change',
      component:ChanImg
    },
    {
      path:'/forget',
      component:ForGet
    },
    {
      path:'/message',
      component:MessAge
    },{
      path:'/error',
      component:ErrorMes
    },
    {
      path:'/edit/:id',
      component:EditArt
    },
    {
      path:'/share/:id',
      component:ShareCon
    }

  ]
})
// 