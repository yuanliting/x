<template>
    <div class="content">
    <search class="header"
    @result-click="resultClick"
    @on-change="getResult"
    :results="results"
    v-model="value"
    position="fiex"
    auto-scroll-to-top top="0px"
    @on-focus="onFocus"
    @on-cancel="onCancel"
    @on-submit="onSubmit"
    ref="search"></search>

     
    
    </div>


</template>

<script>
import { Search  } from "vux";
import axios  from 'axios';
export default {
  data: function() {
    return {
         results: [],
      value: '社团活动',
      demo01: 0,
      p:[],
      title:'',
      show:false
      
      
    };
  },
  computed: {},
  components: {
     
    Search
   
  },
  methods: {
        onFocus () {
      console.log('on focus')
    },
    onCancel () {
      console.log('on cancel')
    },
     resultClick (item) {
      // window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      this.results = val ? getResult(this.value) : []
    },
     onSubmit () {
      // this.$refs.search.setBlur()
      console.log(this.value)
      var con = this.value;
      //搜索功能
       axios.post('/host/search',{
         con:con
       }).then((resData)=>{

            console.log(resData.data)
            // setting.catergorey
           
            if(resData.data.error == 1){
                this.title = '没有该内容'
                location.href = '#/error'

            }
          if(resData.data.error == 0){
                var id = resData.data.category
                // console.log(id);
                location.href = '#/cater/'+id;
          }
       }).catch((error)=>{
            console.log(error)
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