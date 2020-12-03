/*
 * @Date: 2020-11-16 15:21:57
 * @LastEditors: zhangyuge
 * @LastEditTime: 2020-11-18 14:33:36
 * @FilePath: \partd:\huanbo\backmananger\src\utils\loading.js
 */

import { Loading } from 'element-ui';

import { debounce } from './index';
let loadingCount = 0;
let loading;

const startLoading = () => {
    loading = Loading.service({
        lock: true
        // text: '……',
        // background: 'rgba(0, 0, 0, 0.7)'
    });
};

const endLoading = () => {
    loading.close();
};

export const showLoading = () => {
    debounce(() => {
        if (loadingCount === 0) {
            startLoading();
        }
        loadingCount += 1;
    }, 300);
};

export const hideLoading = () => {
    if (loadingCount <= 0) {
        return;
    }
    loadingCount -= 1;
    if (loadingCount === 0) {
        endLoading();
    }
};
