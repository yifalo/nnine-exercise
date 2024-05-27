
<template>
  <content-base>
    <div class="row justify-content-center">
      <div class="col-3">
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="username" class="form-label">用户名</label>
            <input v-model="username" type="text" class="form-control" id="username" >
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">密码</label>
            <input v-model="password" type="password" class="form-control" id="password">
          </div>
          <div class="mb-3">
            <label for="password_confirm" class="form-label">确认密码</label>
            <input v-model="password_confirm" type="password" class="form-control" id="password_confirm">
          </div>
          <div class="password-error">{{errorMessage}}</div>
          <button type="submit" class="btn btn-primary">注册</button>
        </form>
      </div>
    </div>

  </content-base>
</template>
<script >
import ContentBase from "../components/ContentBase.vue";
import {ref} from 'vue';
import {useStore} from "vuex";
import $ from 'jquery';
import router from "@/router/index";

export default {
  name: 'RegisterView',
  components: {
    ContentBase,
  },
  setup(){
    const store = useStore();
    let username = ref('');
    let password = ref('');
    let errorMessage = ref('');
    let password_confirm = ref('');
    console.log(store,router);
    const register = () => {
      errorMessage.value="";
      $.ajax({
        url:'https://app165.acapp.acwing.com.cn/myspace/user/',
        type:'post',
        data:{
          username:username.value,
          password:password.value,
          password_confirm:password_confirm.value,
        },
        success:(resp)=>{
          console.log(resp);
        }
      })
    };

    return{
      username,
      password,
      errorMessage,
      register,
      password_confirm,

    }
  }
}
</script>
<style scoped>
button{
  width: 100%;
}
.password-error{
  color: red;
}
</style>