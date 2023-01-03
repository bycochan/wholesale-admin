<!--
 * @Author: BycoChan
 * @Date: 2022-11-21 16:53:19
 * @LastEditTime: 2022-11-22 17:13:16
 * @LastEditors: BycoChan
 * @Description: 内容装载页面
 * @FilePath: \vue-naive-admin-main\src\components\page\AppPage.vue
 * 
-->
<template>
  <transition name="fade-slide" mode="out-in" appear>
    <section class="cus-scroll-y wh-full p-15 flex-col bg-[#f5f6fb]">
      <slot />
      <!-- <n-back-top :bottom="20" /> -->
    </section>
  </transition>
</template>

<script setup></script>
