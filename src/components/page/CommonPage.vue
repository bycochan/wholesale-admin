<!--
 * @Author: BycoChan
 * @Date: 2022-11-21 16:53:19
 * @LastEditTime: 2022-11-22 17:18:59
 * @LastEditors: BycoChan
 * @Description: 公共内容页面
 * @FilePath: \vue-naive-admin-main\src\components\page\CommonPage.vue
 * 
-->
<template>
  <AppPage>
    <header v-if="showHeader" px-15 mb-15 min-h-45 flex justify-between items-center>
      <slot v-if="$slots.header" name="header" />
      <template v-else>
        <!-- <h2 color="#333" text-22 font-normal>{{ title || route.meta?.title }}</h2> -->
        <slot name="action" />
      </template>
    </header>

    <n-card rounded-10 flex-1>
      <slot />
    </n-card>
  </AppPage>
</template>

<script setup>
defineProps({
  showHeader: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: undefined,
  },
})
const route = useRoute()
</script>
