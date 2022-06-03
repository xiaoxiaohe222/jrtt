import {reqLogin} from "@/api";


const state = {
    token:localStorage.getItem("token") ||  '',
    refresh_token: '',
    isLoading:false
}
const mutations = {
    SAVE_LOADING(state,loading){
       state.isLoading = loading
    },
    SAVE_TOKEN(state, token) {
        state.token = token
    },
    SAVE_REFRESH_TOKEN(state, refresh_token) {
        state.refresh_token = refresh_token
    },
    LOGOUT(){
        state.token =''
        state.refresh_token = ''
        localStorage.removeItem('token')
    }
}
const actions = {
    async login_action({commit}, user) {
        const res = await reqLogin(user)
        const {refresh_token, token} = res.data;
        localStorage.setItem('token',token)
        localStorage.setItem('refresh_token',refresh_token)
        commit('SAVE_TOKEN', token)
        commit('SAVE_REFRESH_TOKEN', refresh_token)
    }
}
const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
