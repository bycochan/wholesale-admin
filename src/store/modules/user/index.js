/*
 * @Author: BycoChan
 * @Date: 2022-11-21 16:53:19
 * @LastEditTime: 2022-11-29 22:54:28
 * @LastEditors: BycoChan
 * @Description: 用户信息store
 * @FilePath: \vue-naive-admin-main\src\store\modules\user\index.js
 *
 */
import { defineStore } from 'pinia'
import { resetRouter } from '@/router'
import { useTagsStore, usePermissionStore } from '@/store'
import { removeToken, toLogin } from '@/utils'
import api from '@/api'

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: {},
    }
  },
  getters: {
    userId() {
      return this.userInfo?.id
    },
    name() {
      return this.userInfo?.name
    },
    avatar() {
      return this.userInfo?.avatar
    },
    role() {
      return this.userInfo?.role || []
    },
  },
  actions: {
    async getUserInfo() {
      try {
        const res = await api.getUser()
        const id = res.data.adminUserId
        const name = res.data.adminNickname
        const role = ['admin']
        const avatar = 'https://www.naiveui.com/assets/naivelogo.93278402.svg'
        this.userInfo = { id, name, avatar, role }
        console.log(this.userInfo)
        return Promise.resolve(res.data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async logout(flag) {
      const { resetTags } = useTagsStore()
      const { resetPermission } = usePermissionStore()
      if (flag) {
        api.logout()
      }
      removeToken()
      resetTags()
      resetPermission()
      resetRouter()
      this.$reset()
      toLogin()
    },
    setUserInfo(userInfo = {}) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    },
  },
})
