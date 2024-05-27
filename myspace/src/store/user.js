import $ from 'jquery';
import {jwtDecode} from "jwt-decode";
const ModuleUser={
    state: {
        id:"",
        username:"",
        photo:"",
        followCount:0,
        access:"",
        refresh:"",
        is_login:false,

    },
    getters: {
    },
    mutations: {
        updateUser(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.followCount = user.followCount;
            state.access = user.access;
            state.refresh = user.refresh;
            state.is_login = user.is_login;
        },
        updateAccess(state, access) {
            state.access = access;
        },

        logout(state) {
            state.id='';
            state.username = '';
            state.photo='';
            state.followCount = 0;
            state.access = '';
            state.refresh='';
            state.is_login = false;
        }

    },
    actions: {
        login(context, data) {
            $.ajax({
                url: 'https://app165.acapp.acwing.com.cn/api/token/',
                type: 'post',
                data:{
                    username: data.username,
                    password: data.password,
                },

                success(resp){
                    const {access,refresh}=resp;
                    const access_obj=jwtDecode(access);
                    setInterval(()=>{
                        $.ajax({
                           url: 'https://app165.acapp.acwing.com.cn/api/token/refresh/',
                            type:'post',
                            data:{
                               refresh:refresh,
                            },
                            success(resp){
                               context.commit("updateAccess",{
                                   access:resp.access,
                               })
                            }
                        });
                    },4.5*60*1000)
                    $.ajax({
                        url: 'https://app165.acapp.acwing.com.cn/myspace/getinfo/',
                        type: 'get',
                        data: {
                            user_id: access_obj.user_id,
                        },
                        headers: {
                            'Authorization': "Bearer " + access,
                        },
                        success(resp){
                            context.commit("updateUser",{
                                ...resp,//resp解构
                                access:access,
                                refresh:refresh,
                                is_login:true,

                            });
                            data.success();

                        },

                    })

                },

                error(){
                    data.error();
                }



            })
        }
    },
    modules: {
    }
};

export default ModuleUser;