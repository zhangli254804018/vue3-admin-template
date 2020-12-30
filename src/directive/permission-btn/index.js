/*
 * @Date: 2020-11-03 14:34:30
 * @LastEditors: zhangyuge
 * @LastEditTime: 2020-11-03 14:39:43
 * @FilePath: \partd:\huanbo\backmananger\src\directive\permission-btn\index.js
 */
import permissionBtn from './permission-btn'

const install = function(Vue) {
    Vue.directive('permission-btn', permissionBtn)
}

if (window.Vue) {
    window['permission-btn'] = permissionBtn
    Vue.use(install); // eslint-disable-line
}

permissionBtn.install = install
export default permissionBtn
