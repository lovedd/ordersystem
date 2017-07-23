// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
/*
 主要是把 vue-router 的狀態放進 vuex 的 state 中，
 這樣就可以透過改變 state 來進行路由的一些操作，當然直接使用像是 $route.go 之類的也會影響到 state ，會同步的是這幾個屬性
 {
 path: '',
 query: null,
 params: null
 }
 以下3个可以从vuex取得并使用
 store.state.route.path   // current path (string)
 store.state.route.params // current params (object)
 store.state.route.query  // current query (object)
 */
import { sync } from 'vuex-router-sync';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'normalize.css';
import 'element-ui/lib/theme-default/index.css';

Vue.config.productionTip = false;
// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router);
Vue.use(ElementUI);

// 后期element-ui按需引入
/* eslint-disable no-new */
const app = new Vue({
    el: '#app',
    router,
    store,
    ElementUI,
    template: '<App/>',
    components: {App}
});

// expose the app, the router and the store.
// note we are not mounting the app here, since bootstrapping will be
// different depending on whether we are in a browser or on the server.
export { app, router, store };
