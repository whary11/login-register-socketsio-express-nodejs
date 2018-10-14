import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

import App from './App.vue';
import TablaMenus from './componentes/TablaMenus.vue';
// import Ordenes from './componentes/Ordenes.vue';
import Sucursales from './componentes/Sucursales.vue';
import Escritorio from './componentes/Escritorio.vue';
import ActualizarCuenta from './componentes/ActualizarCuenta.vue';


new Vue({
  // ...
  el:"#dash",
  components: {
    'app': App,
    //'ordenes': Ordenes,
  }
})
const routes = [
  {
    name: 'sucursales',
    path: '/dashboard/sucursales',
    component: Sucursales
  },
  {
    name: 'escritorio',
    path: '/dashboard',
    component: Escritorio
  },
  {
    name: 'actualizar-cuenta',
    path: '/dashboard/actualizar-cuenta',
    component: ActualizarCuenta
  },
];

const router = new VueRouter({ mode: 'history', routes });
new Vue(Vue.util.extend({ router },App)).$mount('#dash');



