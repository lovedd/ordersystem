/**
 * Created by liuliu on 2017/7/10.
 */
import fetch from 'utils/fetch';
export function login (options) {
    // debugger;
    return fetch({
        url: '/login',
        method: 'post',
        // params: options
        options
    });
}
