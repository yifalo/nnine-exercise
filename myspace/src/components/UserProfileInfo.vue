
<template>

  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-3 img-field">
          <img :src="user.photo" alt="" class="img-fluid ">
        </div>
        <div class="col-9">
          <div class="username">{{user.username}}</div>
          <div class="fans">粉丝数：{{user.followerCount}}</div>
          <button v-on:click="follow" v-if="!user.is_following"   type="button" class="btn btn-secondary btn-sm">+关注</button>
          <button v-on:click="unfollow" v-if="user.is_following"   type="button" class="btn btn-secondary btn-sm">取消关注</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script >
import $ from 'jquery';
import {useStore} from "vuex";
export default {
  name:'UserProfileInfo',
  props:{
    user:{
      type:Object,
      required:true,
    },
  },
  setup(props,context){
    const store=new useStore();

    const follow=()=>{
        $.ajax({
          url:'https://app165.acapp.acwing.com.cn/myspace/follow/',
          type:'post',
          data:{
            target_id:props.user.id,
          },
          headers:{
            'Authorization': 'Bearer ' + store.state.user.access,
          },
          success(resp){
            if(resp.result==='success'){
                context.emit('follow');
            }
          }
        })

    };

    const unfollow=()=>{
      $.ajax({
        url:'https://app165.acapp.acwing.com.cn/myspace/follow/',
        type:'post',
        data:{
          target_id:props.user.id,
        },
        headers:{
          'Authorization': 'Bearer ' + store.state.user.access,
        },
        success(resp){
          if(resp.result==='success'){
            context.emit('unfollow');
          }
        }
      })
    }

    return{

      follow,
      unfollow,
    }
  }
}
</script>

<style scoped>
img{
  border-radius: 50%;

}
.username{
  font-weight: bold;
}
.fans{
  font-size: 12px;
  color:gray;
}
button{
  padding: 2px 4px;

  font-size: 12px;
}
.img-field{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>