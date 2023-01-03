<!--
 * @Author: BycoChan
 * @Date: 2022-11-21 16:53:19
 * @LastEditTime: 2022-11-21 17:35:08
 * @LastEditors: BycoChan
 * @Description: 侧边导航栏
 * @FilePath: \vue-naive-admin-main\src\layout\components\sidebar\components\SideLogo.vue
 * 
-->
<template>
  <router-link h-60 f-c-c to="/">
    <icon-custom-workbench text-36 color-primary></icon-custom-workbench>
    <h2 v-show="!appStore.collapsed" ml-10 color-primary text-16 font-bold max-w-140 flex-shrink-0>
      {{ title }}
    </h2>
  </router-link>
</template>

<script setup>
import { useAppStore } from '@/store'
const title = import.meta.env.VITE_TITLE

const appStore = useAppStore()
</script>
