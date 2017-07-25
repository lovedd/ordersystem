/**
 * Created by liuliu on 2017/7/10.
 */
import fetch from 'utils/fetch';

export function queryBillList (options) {
    return fetch({
        url: '/goodsBill',
        params: options
    });
};

export function fetchBillList (options) {
    return fetch({
        url: '/goodsBill',
        method: 'post',
        params: options
    });
};
