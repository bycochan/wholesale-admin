/*
 * @Author: BycoChan
 * @Date: 2022-11-22 10:49:24
 * @LastEditTime: 2022-12-28 20:57:44
 * @LastEditors: BycoChan
 * @Description: 商品分类路由
 * @FilePath: \vue-naive-admin-main\src\views\commodity-category\route.js
 *
 */
const Layout = () => import('@/layout/index.vue')

export default {
  name: 'CommodityCategory',
  path: '/',
  component: Layout,
  redirect: '/commodity-category',
  children: [
    {
      name: 'CommodityCategory',
      path: 'commodity-category',
      component: () => import('./index.vue'),
      meta: {
        title: '商品分类',
        icon: 'mdi:tag-multiple-outline',
        role: ['admin'],
        requireAuth: true,
        keepAlive: true,
        order: 0,
      },
    },
  ],
}
