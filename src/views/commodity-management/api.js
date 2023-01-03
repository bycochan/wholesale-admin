/*
 * @Author: BycoChan
 * @Date: 2022-11-21 16:53:20
 * @LastEditTime: 2022-12-28 23:02:22
 * @LastEditors: BycoChan
 * @Description:商品接口
 * @FilePath: \vue-naive-admin-main\src\views\commodity-management\api.js
 *
 */

import { request } from '@/utils'

export default {
  getList: (params = {}) => request.get('/product/page', { params }),
  getDetailById: (id) => request.get(`/product/${id}`),
  add: (data) => request.post('/product/new', data),
  edit: (data) => request.put(`/product/editInfo`, data),
  editStock: (data) => request.put(`/product/editStock`, data),
  delete: (id) => {
    let ids = [id]
    request.delete(`/product/delete`, ids)
  },
  getCategoryList: (params = {}) => request.get('/product-category/list', { params }),
}
