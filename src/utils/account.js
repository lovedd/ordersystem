/**
 * Created by liuliu on 2017/7/10.
 */
import store from '../store';

export function isLogin () {
    console.log(store.state.account.token);
    return store.state.account.token;
}
