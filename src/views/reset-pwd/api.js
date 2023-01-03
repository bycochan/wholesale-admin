/*
 * @Author: BycoChan
 * @Date: 2022-11-21 16:53:20
 * @LastEditTime: 2022-11-29 22:10:16
 * @LastEditors: BycoChan
 * @Description: 修改密码页面
 * @FilePath: \vue-naive-admin-main\src\views\workbench\api.js
 *
 */
import { request } from '@/utils'

export default {
  resetPwd: (data) => request.put('/basic/resetPwd', data),
}
