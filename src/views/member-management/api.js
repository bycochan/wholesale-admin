/*
 * @Author: BycoChan
 * @Date: 2022-11-22 13:50:01
 * @LastEditTime: 2022-11-29 13:45:39
 * @LastEditors: BycoChan
 * @Description: 会员管理接口
 * @FilePath: \vue-naive-admin-main\src\views\member-management\api.js
 *
 */
import { request } from '@/utils'

export default {
  getMembers: (params = {}) => request.get('/user/page', { params }),
  getMemberById: (id) => request.get(`/user/${id}`),
  addMember: (data) => request.post('/user/new', data),
  updateMember: (data) => request.put(`/user/edit`, data),
  deleteMember: (id) => request.delete(`/user/${id}`),
}
