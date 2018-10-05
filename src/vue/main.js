import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

import App from './App.vue';
import TablaMenus from './componentes/TablaMenus.vue';
//Vue.component('TablaMenus', './componentes/TablaMenus.vue')
//import DisplayItem from './components/DisplayItem.vue';
//import EditItem from './components/EditItem.vue';
new Vue({
  // ...
  el:"#dash",
  components: {
    'tablamenus': TablaMenus,
  }
})
const routes = [
  {
    //name: 'TablaMenus',
    //path: '/dashboard',
    //component: TablaMenus
  },
  
];



const router = new VueRouter({ mode: 'history', routes: routes });
new Vue(Vue.util.extend({ router }, App)).$mount('#dash');
