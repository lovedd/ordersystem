/**
 * Created by liuliu on 2017/7/10.
 */
import fetch from 'utils/fetch';

export function queryTeamList (query) {
    return fetch({
        url: '/queryTeamList',
        params: query
    });
}
