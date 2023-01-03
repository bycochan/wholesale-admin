<!--
 * @Author: BycoChan
 * @Date: 2022-11-21 16:53:20
 * @LastEditTime: 2022-11-29 22:58:58
 * @LastEditors: BycoChan
 * @Description: 修改密码
 * @FilePath: \vue-naive-admin-main\src\views\reset-pwd\index.vue
 * 
-->

<template>
  <AppPage :show-footer="true">
    <n-card>
      <n-space justify="center">
        <n-form ref="resetFormRef" label-placement="left" label-align="left" :label-width="80" :model="resetForm">
          <n-form-item
            label="旧密码"
            path="oldEncryptedPwd"
            :rule="{
              required: true,
              message: '请输入',
              trigger: ['input', 'blur'],
            }"
          >
            <n-input
              v-model:value="resetForm.oldEncryptedPwd"
              type="password"
              show-password-on="mousedown"
              placeholder="请输入"
            />
          </n-form-item>
          <n-form-item
            label="新密码"
            path="newEncryptedPwd"
            :rule="{
              required: true,
              message: '请输入',
              trigger: ['input', 'blur'],
            }"
          >
            <n-input
              v-model:value="resetForm.newEncryptedPwd"
              type="password"
              show-password-on="mousedown"
              placeholder="请输入"
            />
          </n-form-item>
          <n-form-item>
            <n-button attr-type="button" @click="handleValidateClick">确定</n-button>
          </n-form-item>
        </n-form>
      </n-space>
    </n-card>
  </AppPage>
</template>

<script setup>
import { useUserStore } from '@/store'
import api from './api'

const userStore = useUserStore()
const resetFormRef = ref(null)
const resetForm = ref({
  oldEncryptedPwd: '',
  newEncryptedPwd: '',
})

function handleValidateClick(e) {
  e.preventDefault()
  resetFormRef.value?.validate((errors) => {
    if (!errors) {
      api.resetPwd(resetForm.value).then((res) => {
        userStore.logout()
      })
    } else {
      console.log(errors)
    }
  })
}
</script>
