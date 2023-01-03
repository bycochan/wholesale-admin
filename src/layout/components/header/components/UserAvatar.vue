<!--
 * @Author: BycoChan
 * @Date: 2022-11-21 16:53:19
 * @LastEditTime: 2022-11-29 22:58:08
 * @LastEditors: BycoChan
 * @Description: 用户头像名称信息
 * @FilePath: \vue-naive-admin-main\src\layout\components\header\components\UserAvatar.vue
 * 
-->
<template>
  <n-dropdown :options="options" @select="handleSelect">
    <div flex items-center cursor-pointer>
      <img src="../../../../assets/svg/avatar.svg" mr10 w-35 h-35 rounded-full />
      <span>{{ userStore.name }}</span>
    </div>
  </n-dropdown>
</template>

<script setup>
import { useUserStore } from '@/store'
import { renderIcon } from '@/utils'

const router = useRouter()
const userStore = useUserStore()

const options = [
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon('mdi:exit-to-app', { size: '14px' }),
  },
  {
    label: '修改密码',
    key: 'resetPwd',
    icon: renderIcon('mdi:lock-reset', { size: '14px' }),
  },
]

function handleSelect(key) {
  if (key === 'logout') {
    $dialog.confirm({
      title: '提示',
      type: 'info',
      content: '确认退出？',
      confirm() {
        userStore.logout(true)
        $message.success('已退出登录')
      },
    })
  } else if (key === 'resetPwd') {
    router.push('/reset-pwd')
  }
}
</script>
