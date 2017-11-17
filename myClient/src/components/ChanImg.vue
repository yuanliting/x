<template>
    <div class="content">
        <x-header>头像修改</x-header>
    <div class="auto-wrap">
    <form action=" "  ref="auto">
        <div class="auto-inp">
            <input type="file" accept="img/*" name="auto">
        </div><br>
<button type="submit" @click.prevent="updata">修改</button>
    </form>

    </div>

    </div>

</template>
<script>
import {XHeader} from 'vux';
import axios from 'axios';
export default {
    data:function(){
        return {
            user:''
        }
    },
    components:{
        XHeader,
    },
    methods:{
        updata:function(){
            var fabu = this.$refs.auto;
            // console.log(fabu);
            var data = new FormData(fabu);
            const that = this;
        var config ={
            headers:{
                'Content-Type':'multipart/form-data'
            }
        };
        axios.post('/host/imageupload',data,config).then((resData)=>{
                    console.log(resData.data);
        }).catch((error)=>{
                console.log(error);
        })

        }
    }

}
</script>

<style scoped>

.auto-inp input{
    width: 60px;
    height: 60px;
}
.auto-wrap form{
    widows: 60px;
    margin: 60px auto;
}
.auto-wrap form button{
    display: block;
    width: 94%;
    height: 40px;
    border: none;
    margin: 10px auto;

    border-radius: 10px;
    background: darkcyan;
}
</style>
