/*
 * @Date: 2020-10-12 16:10:55
 * @LastEditors: zhangyuge
 * @LastEditTime: 2020-11-18 14:25:37
 * @FilePath: \partd:\huanbo\backmananger\src\directive\permission\permission.js
 */
import store from '@/store'

//这块是控制展示菜单栏目录的逻辑方法
//使用方法为v-permission 
//ex.<el-menu-item v-permission="onlyOneChild.name"></el-menu-item>
//角色返回的字段一般都是通过mate判断 "MemberRoot","AuditRoot","ChargeRoot","FinanceRoot","TaskRoot","ContentRoot","ReportRoot","SystemRoot","Member","MemberVip",
//参见路由router.js meta: { title: 'MemberRoot', icon: 'dashboard' },
const checkPermission = (el, binding) => {
    const { value } = binding
    // const roles = store.getters && store.getters.roles
    const menus = store.getters && store.getters.menus

    if (value) {
        const menusList = menus && menus.map(item => item.url) || []
        // const hasPermission = menusList.includes(value)
        const hasPermission = menusList.findIndex(item=>{
            // return item.indexOf(value) > -1
            return item && item.includes(value)
        })
        //这块是判断是否将没有权限的菜单给隐藏
        //测试环境下注释这块的权限控制
        if (hasPermission == -1) {
            el.parentNode && el.parentNode.removeChild(el)
        }
    } else {
        el.parentNode && el.parentNode.removeChild(el)
        // throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
}

export default {
    inserted(el, binding) {
        checkPermission(el, binding)
    },
    update(el, binding) {
        checkPermission(el, binding)
    }
}
