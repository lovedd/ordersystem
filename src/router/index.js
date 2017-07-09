import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/login/Login';
import Home from '@/views/home/Home';
import NotFound from '@/views/error/404';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '*',
            name: 'notFound',
            component: NotFound
        }
    ]
});
