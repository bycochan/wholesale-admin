/*
 * @Author: BycoChan
 * @Date: 2022-11-21 16:53:20
 * @LastEditTime: 2022-11-28 15:41:27
 * @LastEditors: BycoChan
 * @Description: 登录页面
 * @FilePath: \vue-naive-admin-main\src\views\login\api.js
 *
 */
import { request } from '@/utils'

export default {
  login: (data) => request.post('/basic/login', data, { noNeedToken: true }),
}
