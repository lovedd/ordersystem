/**
 * Created by liuliu on 2017/7/10.
 */
import Cookie from 'js-cookie';
import * as accountService from 'api/account';

const account = {
    state: {
        token: Cookie.get('WDD-Token')
    },
    actions: {
        login ({commit, state}, options = {}) {
            return new Promise((resolve, reject) => {
                // debugger;
                // 这里看一下这样写是否会存在栈溢出或者内存泄漏，看一下promise的链式调用和嵌套调用，看书你不知道的javascript
                accountService.login(options.qs).then(response => {
                    // debugger;
                    if (response.responseCode === '000000') {
                        const data = response.data;
                        Cookie.set('WDD-Token', data.token);
                        commit('SET_TOKEN', {token: data.token});
                        resolve(response);
                    } else {
                        console.log(response.errMsg || '错误');
                        reject(response);
                    }
                })
                    // 处理返回为非200的status或者在fetch中已经处理过的responseCode信息
                    .catch(response => {
                    // debugger;
                    // if (response && response.status !== 200) {
                    //     console.log(response);
                    // }
                    });
            });
        }
    },
    mutations: {
        SET_TOKEN: (state, payload) => {
            state.token = payload.token;
        },
        LOG_OUT: (state, payload) => {
            state.token = null;
            Cookie.remove('WDD-Token');
        }
    }
};

export default account;
