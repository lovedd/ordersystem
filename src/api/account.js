/**
 * Created by liuliu on 2017/7/10.
 */
import fetch from 'utils/fetch';
export function login (options) {
    return fetch({
        url: '/login.json',
        // method: 'post',
        params: options
    });
}
