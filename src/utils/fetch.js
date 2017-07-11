/**
 * Created by liuliu on 2017/7/10.
 */
import axios from 'axios';

const service = axios.create({
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
    baseURL: 'http://localhost:3000',
    // `method` 是创建请求时使用的方法
    method: 'get', // 默认是 get
    // 超时时间
    timeout: 5000,
    // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
    validateStatus: function (status) {
        return status >= 200 && status < 300; // 默认的
    }
});

// response拦截器
service.interceptors.response.use(
    response => response.data,
    error => {
        console.log('err' + error);
        return Promise.reject(error);
    }
);

export default service;
