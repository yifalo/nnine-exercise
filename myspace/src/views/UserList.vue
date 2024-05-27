
<template>
<content-base>
 <div class="card" v-for="user in users" :key="user.id">
   <div class="card-body">
      <div class="row">
        <div class="col-1">
          <img :src="user.photo" alt="" class="img-fluid">
        </div>
        <div class="col-11">
          <div class="username">{{user.username}}</div>
          <div class="follow-count">{{user.followerCount}}</div>
        </div>
      </div>
   </div>
 </div>
</content-base>
</template>
<script >
import ContentBase from "../components/ContentBase.vue";
import $ from 'jquery';
import {ref} from  'vue';


export default {
  name: 'UserList',
  components: {
    ContentBase,
  },
  setup(){

      let users=ref([]);
       $.ajax({
         url:'https://app165.acapp.acwing.com.cn/myspace/userlist/',
         type:'GET',
         success(resp){
           users.value=resp;
         }
       });
        return{
          users,
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
  height: 50%;
}
.follow-count{
  font-size: 12px;
  color: gray;
  height: 50%;
}
.card{
  margin-bottom: 20px;
  cursor: pointer;
}
.card:hover{
  box-shadow: 2px 2px 10px lightgray;
  transition: 500ms;
}
</style>