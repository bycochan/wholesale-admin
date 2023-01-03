/*
 * @Author: BycoChan
 * @Date: 2022-11-21 16:53:20
 * @LastEditTime: 2022-11-29 22:57:27
 * @LastEditors: BycoChan
 * @Description:路由
 * @FilePath: \vue-naive-admin-main\src\views\reset-pwd\route.js
 *
 */
const Layout = () => import('@/layout/index.vue')

export default {
  name: 'resetPwd',
  path: '/',
  component: Layout,
  redirect: '/reset-pwd',
  isHidden: true,
  children: [
    {
      name: 'resetPwd',
      path: 'reset-pwd',
      component: () => import('./index.vue'),
      meta: {
        title: '修改密码',
        icon: 'mdi:lock-reset',
        order: 0,
      },
    },
  ],
}
