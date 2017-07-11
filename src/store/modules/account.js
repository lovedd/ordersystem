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
                accountService.login(options.qs).then(response => {
                    const data = response.data;
                    Cookie.set('WDD-Token', data.token);
                    commit('SET_TOKEN', {token: data.token});
                    resolve(response);
                });
            });
        }
    },
    mutations: {
        SET_TOKEN: (state, payload) => {
            state.token = payload.token;
        }
    }
};

export default account;
