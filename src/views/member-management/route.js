/*
 * @Author: BycoChan
 * @Date: 2022-11-22 10:49:24
 * @LastEditTime: 2022-12-30 23:38:27
 * @LastEditors: BycoChan
 * @Description: 会员管理路由
 * @FilePath: \vue-naive-admin-main\src\views\member-management\route.js
 *
 */
const Layout = () => import('@/layout/index.vue')

export default {
  name: 'MemberManagement',
  path: '/',
  component: Layout,
  redirect: '/member-management',
  children: [
    {
      name: 'MemberManagement',
      path: 'member-management',
      component: () => import('./index.vue'),
      meta: {
        title: '会员管理',
        icon: 'mdi:account-cog-outline',
        role: ['admin'],
        requireAuth: true,
        keepAlive: true,
        order: 0,
      },
    },
  ],
}
