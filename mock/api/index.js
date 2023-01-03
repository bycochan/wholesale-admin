/*
 * @Author: BycoChan
 * @Date: 2022-11-21 16:53:19
 * @LastEditTime: 2022-11-23 11:05:23
 * @LastEditors: BycoChan
 * @Description: mock index
 * @FilePath: \vue-naive-admin-main\mock\api\index.js
 *
 */
import auth from './auth'
import user from './user'
import post from './post'
import member from './member'

export default [...auth, ...user, ...post, ...member]
