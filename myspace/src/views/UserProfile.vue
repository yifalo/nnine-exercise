
<template>
  <content-base>
    <div class="row">
        <div class="col-3">
          <UserProfileInfo v-on:follow="follow"  @unfollow="unfollow"  v-bind:user="user"/>
          <UserProfileWrite v-on:post_a_post="post_a_post"></UserProfileWrite>
        </div>
        <div class="col-9">
          <UserProfilePost  v-bind:posts="posts"> </UserProfilePost>
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

export default {
  name: 'UserProfile',
  components: {
    ContentBase,
    UserProfileInfo,
    UserProfilePost,
    UserProfileWrite,
  },
  setup(){




    const user=reactive({
      id:1,
      username:"N nine",
      lastname:"yu",
      firstname:"feihong",
      followerCount:0,
      is_following:false,
    });

    const posts=reactive({
      count:3,
      posts:[
        {
          id:1,
          userId:1,
          content:"我是俞飞鸿"
        },
        {
          id:2,
          userId:1,
          content:"我是俞飞鸿俞飞鸿"
        },
        {
          id:3,
          userId:1,
          content:"我是俞飞鸿俞飞鸿俞飞鸿"
        },
      ]
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

    return{
      posts,
      user,
      follow,
      unfollow,
      post_a_post,
    }
  }
}
</script>
<style scoped>

</style>