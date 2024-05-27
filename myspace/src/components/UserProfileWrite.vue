

<template>
<div class="card write">
  <div class="card-body">

    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label">编辑</label>
      <textarea v-model="content" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      <button  v-on:click="post_a_post" type="button" class="btn btn-primary btn-sm">发布</button>

    </div>
  </div>
</div>
</template>

<script >
import {ref} from 'vue';
import $ from 'jquery';
import {useStore} from "vuex";
export default {
  name:'UserProfilePostPost',
  setup(props,context){
    let content=ref('');
    const store=new useStore();
    const post_a_post=()=>{
      $.ajax({
        url:'https://app165.acapp.acwing.com.cn/myspace/post/',
        type:"POST",
        data:{
          content:content.value,
        },
        headers:{
          'Authorization': 'Bearer ' + store.state.user.access,
        },
        success(resp){
            if(resp.result==='success'){
              context.emit('post_a_post',content.value);
              content.value="";
            }
        }
      })

    }

    return{
      content,
      post_a_post,


    }
  },

}


</script>

<style scoped>
.write{

  margin-top: 20px;
}
button{
  margin-top: 10px;
}
</style>