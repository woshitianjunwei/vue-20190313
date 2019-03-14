import Vue from 'vue';
import App from './App.vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VueRouter from 'vue-router';
import {routes} from './routes';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(iView);
Vue.use(VueRouter);

const router=new VueRouter({
  routes:routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)//渲染
})
