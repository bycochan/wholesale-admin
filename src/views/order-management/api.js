/*
 * @Author: BycoChan
 * @Date: 2022-12-30 23:30:29
 * @LastEditTime: 2022-12-30 23:47:50
 * @LastEditors: BycoChan
 * @Description: 订单管理接口
 * @FilePath: \vue-naive-admin-main\src\views\order-management\api.js
 *
 */

import { request } from '@/utils'

export default {
  getList: (params = {}) => request.get('/order/page', { params }),
  getDetailById: (productCategoryId) => request.get(`/order/${productCategoryId}`),
  addCategory: (data) => request.post('/order/new', data),
  edit: (data) => request.put(`/order/edit`, data),
  editSortNo: (data) => request.put(`/order/editSortNo`, data),
  delete: (id) => {
    let ids = [id]
    request.delete(`/order/delete`, ids)
  },
}
