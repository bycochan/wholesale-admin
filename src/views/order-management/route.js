/*
 * @Author: BycoChan
 * @Date: 2022-11-22 10:49:24
 * @LastEditTime: 2022-12-30 23:33:48
 * @LastEditors: BycoChan
 * @Description: 订单管理路由
 * @FilePath: \vue-naive-admin-main\src\views\order-management\route.js
 *
 */
const Layout = () => import('@/layout/index.vue')

export default {
  name: 'OrderManagement',
  path: '/',
  component: Layout,
  redirect: '/order-management',
  children: [
    {
      name: 'OrderManagement',
      path: 'order-management',
      component: () => import('./index.vue'),
      meta: {
        title: '订单管理',
        icon: 'mdi:file-table-box-multiple-outline',
        role: ['admin'],
        requireAuth: true,
        keepAlive: true,
        order: 0,
      },
    },
  ],
}
