/*
 * @Author: BycoChan
 * @Date: 2022-11-21 16:53:19
 * @LastEditTime: 2022-11-29 15:07:20
 * @LastEditors: BycoChan
 * @Description: 获取用户信息
 * @FilePath: \vue-naive-admin-main\src\api\index.js
 *
 */
import { request } from '@/utils'

export default {
  getUser: () => request.get('/admin/adminInfo'),
  refreshToken: () => request.post('/auth/refreshToken', null, { noNeedTip: true }),
  logout: () => request.post('/basic/logout'),
}
