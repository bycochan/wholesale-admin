<!--
 * @Author: BycoChan
 * @Date: 2022-11-21 16:53:19
 * @LastEditTime: 2022-11-22 09:10:40
 * @LastEditors: BycoChan
 * @Description: 头部菜单栏
 * @FilePath: \vue-naive-admin-main\src\layout\components\header\index.vue
 * 
-->
<template>
  <div flex items-center>
    <MenuCollapse />
    <BreadCrumb ml-15 />
  </div>
  <div ml-auto flex items-center>
    <FullScreen />
    <UserAvatar />
  </div>
</template>

<script setup>
import BreadCrumb from './components/BreadCrumb.vue'
import MenuCollapse from './components/MenuCollapse.vue'
import FullScreen from './components/FullScreen.vue'
import UserAvatar from './components/UserAvatar.vue'
</script>
