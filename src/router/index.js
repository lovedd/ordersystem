import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/login/Login';
import Welcome from '@/views/welcome/Welcome';
import Home from '@/views/home/Home';
import NotFound from '@/views/error/404';
import PwdManage from '@/views/function_menu/PwdManage';
import SalesTeam from '@/views/sales_manage/basic_settings/SalesTeam';
import CustomerCredit from '@/views/sales_manage/basic_settings/CustomerCredit';
import GoodsBill from '@/views/sales_manage/business_manage/GoodsBill';
import SalesContract from '@/views/sales_manage/business_manage/SalesContract';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/welcome',
            name: '欢迎页',
            component: Welcome
        },
        // {
        //     path: '/home',
        //     name: 'home',
        //     component: Home
        // },
        {
            path: '/',
            redirect: '/welcome'
        },
        {
            path: '*',
            name: 'notFound',
            component: NotFound
        },
        {
            path: '/function_menu',
            name: 'functionMenu',
            component: Home,
            redirect: '/function_menu/pwd_manage',
            children: [
                {
                    path: 'pwd_manage',
                    name: 'pwdManage',
                    component: PwdManage
                }
            ]
        },
        {
            path: '/sales_manage',
            name: 'salesManage',
            component: Home,
            children: [
                {
                    path: 'sales_team',
                    name: '销售组',
                    component: SalesTeam
                },
                {
                    path: 'customer_credit',
                    name: '客户信用',
                    component: CustomerCredit
                },
                {
                    path: 'goods_bill',
                    name: '提货单',
                    component: GoodsBill
                },
                {
                    path: 'sales_contract',
                    name: '销售合同',
                    component: SalesContract
                }
            ]
        }
    ]
});
