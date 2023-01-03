<!--
 * @Author: BycoChan
 * @Date: 2022-11-21 16:53:19
 * @LastEditTime: 2022-11-23 14:57:49
 * @LastEditors: BycoChan
 * @Description: 查询卡片
 * @FilePath: \vue-naive-admin-main\src\components\query-bar\QueryBar.vue
 * 
-->
<template>
  <div min-h-60 p-15 flex items-start justify-between b-1 bc-eee rounded-8 bg="#fafafc">
    <div>
      <slot name="queryBarBtn"></slot>
    </div>
    <n-space>
      <n-space wrap :size="[35, 15]">
        <slot name="queryBarInput"></slot>
      </n-space>
      <div flex-shrink-0>
        <n-button ml-20 type="primary" @click="emit('search')">搜索</n-button>
      </div>
    </n-space>
  </div>
</template>

<script setup>
const emit = defineEmits(['search'])
</script>
