/*
 * @Author: BycoChan
 * @Date: 2022-11-22 13:50:01
 * @LastEditTime: 2022-12-28 21:45:21
 * @LastEditors: BycoChan
 * @Description: 商品分类接口
 * @FilePath: \vue-naive-admin-main\src\views\commodity-category\api.js
 *
 */
import { request } from '@/utils'

export default {
  getList: (params = {}) => request.get('/product-category/list', { params }),
  getDetailById: (productCategoryId) => request.get(`/product-category/${productCategoryId}`),
  addCategory: (data) => request.post('/product-category/new', data),
  edit: (data) => request.put(`/product-category/edit`, data),
  editSortNo: (data) => request.put(`/product-category/editSortNo`, data),
  delete: (id) => {
    let ids = [id]
    request.delete(`/product-category/delete`, ids)
  },
}
