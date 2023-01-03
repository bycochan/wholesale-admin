/*
 * @Author: BycoChan
 * @Date: 2022-11-22 10:49:24
 * @LastEditTime: 2022-12-30 23:44:51
 * @LastEditors: BycoChan
 * @Description: 商品管理路由
 * @FilePath: \vue-naive-admin-main\src\views\commodity-management\route.js
 *
 */
const Layout = () => import('@/layout/index.vue')

export default {
  name: 'CommodityManagement',
  path: '/',
  component: Layout,
  redirect: '/commodity-management',
  children: [
    {
      name: 'CommodityManagement',
      path: 'commodity-management',
      component: () => import('./index.vue'),
      meta: {
        title: '商品管理',
        icon: 'mdi:file-table-box-outline',
        role: ['admin'],
        requireAuth: true,
        keepAlive: true,
      },
    },
  ],
}
