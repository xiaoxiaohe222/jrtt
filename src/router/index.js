import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)
import routes from './routes'

export default new VueRouter({
    mode: 'hash',
    routes,
    scrollBehavior (to,) {
        if (to.path === '/home')
            //console.log(sessionStorage.getItem('dis'));
        return { x: 0, y: sessionStorage.getItem('dis')*1  || 0}
    }
})
