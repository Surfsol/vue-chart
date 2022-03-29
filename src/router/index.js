import Vue from 'vue';
import VueRouter from 'vue-router';
import Welcome from '../components/TheWelcome.vue';
import Excel from '../components/Excel.vue';
import Dashboard from '../components/Dashboard.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Excel,
    // children: [
    //   {
    //     path: '/dash',
    //     name: 'dashboard',
    //     component: Dashboard,
    //   },
    //   {
    //     path: '/excel',
    //     name: 'excel',
    //     component: Excel,
    //   },
    // ],
  },
];

const router = new VueRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes,
});

export {router};
