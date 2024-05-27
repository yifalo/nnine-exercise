
<template>
  <content-base>
    <div class="row">
        <div class="col-3">
          <UserProfileInfo v-on:follow="follow"  @unfollow="unfollow"  v-bind:user="user"/>
          <UserProfileWrite v-if="is_me" v-on:post_a_post="post_a_post"></UserProfileWrite>
        </div>
        <div class="col-9">
          <UserProfilePost v-bind:user="user"  v-bind:posts="posts" @delete_post="delete_post" > </UserProfilePost>
        </div>
    </div>
  </content-base>
</template>
<script >
import ContentBase from "../components/ContentBase.vue";
import UserProfileInfo from "../components/UserProfileInfo.vue";
import UserProfilePost  from "../components/UserProfilePost.vue";
import UserProfileWrite from "../components/UserProfileWrite.vue";
import  {reactive} from "vue";
import $ from 'jquery';
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {computed} from "vue";

export default {
  name: 'UserProfile',
  components: {
    ContentBase,
    UserProfileInfo,
    UserProfilePost,
    UserProfileWrite,
  },
  setup(){
    const  route=new useRoute();
    const  store =new useStore();
    const userId=parseInt(route.params.userId);

    const user=reactive({});

    const posts=reactive({});

    $.ajax({
      url:'https://app165.acapp.acwing.com.cn/myspace/getinfo/',
      type:'get',
      data:{
        user_id:userId,
      },
      headers:{
        'Authorization': 'Bearer ' + store.state.user.access,
      },
      success(resp){
        user.id=resp.id;
        user.username=resp.username;
        user.photo=resp.photo;
        user.followerCount=resp.followerCount;
        user.is_following=resp.is_followed;

      }
    });

    $.ajax({
      url:'https://app165.acapp.acwing.com.cn/myspace/post/',
      type:'get',
      data:{
        user_id:userId,
      },
      headers:{
        'Authorization': 'Bearer ' + store.state.user.access,
      },
      success(resp){
        posts.count=resp.length;
        posts.posts=resp;
      }
    });

    const follow=()=>{
      if(user.is_following)return;
      user.is_following=true;
      user.followerCount++;
    };


    const unfollow=()=>{
      if(!user.is_following)return;
      user.is_following=false;
      user.followerCount--;
    };

    const post_a_post=(content)=>{
      posts.count++;
      posts.posts.unshift({
        id:posts.count,
        userId: 1,
        content: content
      })
    };

    const delete_post=(postId)=>{
      posts.posts = posts.posts.filter(post=>post.id !== postId);
      posts.count=posts.posts.length;
    }

   const is_me=computed(()=>userId===store.state.user.id);

    return{
      posts,
      user,
      follow,
      unfollow,
      post_a_post,
      is_me,
      delete_post,
    }
  }
}
</script>
<style scoped>

</style>