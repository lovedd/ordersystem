/**
 * Created by liuliu on 2017/7/10.
 */
import store from '../store';

export function isLogin () {
    return store.state.token;
}
