<template>
  <CommonPage :show-header="false">
    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :extra-params="extraParams"
      :scroll-x="1000"
      :columns="columns"
      :get-data="api.getList"
      @on-checked="onChecked"
    >
      <template #queryBarBtn>
        <n-button type="primary" @click="handleAdd">
          <TheIcon icon="material-symbols:add" :size="18" class="mr-5" /> 添加分类
        </n-button>
      </template>
      <template #queryBarInput>
        <QueryBarItem label="分类名称" :label-width="80">
          <n-input
            v-model:value="queryItems.productCategoryName"
            type="text"
            placeholder="请输入分类名称"
            clearable
            @keydown.enter="$table?.handleSearch"
          />
        </QueryBarItem>
      </template>
    </CrudTable>
    <!-- 新增/编辑/查看 -->
    <CrudModal
      v-model:visible="modalVisible"
      :title="modalTitle"
      :loading="modalLoading"
      :show-footer="modalAction !== 'view'"
      @on-save="handleSave"
    >
      <n-spin :show="dataLoading" description="加载中...">
        <n-form
          ref="modalFormRef"
          label-placement="left"
          label-align="left"
          :label-width="80"
          :model="modalForm"
          :disabled="modalAction === 'view'"
        >
          <n-form-item
            label="分类名称"
            path="productCategoryName"
            :rule="{
              required: true,
              message: '请输入分类名称',
              trigger: ['input', 'blur'],
            }"
          >
            <n-input v-model:value="modalForm.productCategoryName" placeholder="请输入分类名称" />
          </n-form-item>
          <n-form-item
            label="分类排序"
            :rule="{
              required: true,
              message: '请输入排序',
              trigger: ['input', 'blur'],
              validator: validateSort,
            }"
          >
            <n-input-number v-model:value="modalForm.sortNo" :min="1" placeholder="请输入排序" />
          </n-form-item>
          <n-form-item label="是否可见" path="visibleFlag">
            <n-switch v-model:value="modalForm.visibleFlag" />
          </n-form-item>
        </n-form>
      </n-spin>
    </CrudModal>
  </CommonPage>
</template>

<script setup>
import { NButton, NSwitch } from 'naive-ui'
import { formatDateTime, renderIcon, isNullOrUndef } from '@/utils'
import { useCRUD } from '@/composables'
import api from './api'

defineOptions({ name: 'CrudTable' })

const $table = ref(null)
/** QueryBar筛选参数（可选） */
const queryItems = ref({})
/** 补充参数（可选） */
const extraParams = ref({})

onMounted(() => {
  $table.value?.handleSearch()
})

const validateSort = (value) => {
  value && value >= 0
}

const columns = [
  { title: '分类排序', key: 'sortNo', width: 100, ellipsis: { tooltip: true } },
  { title: '分类名称', key: 'productCategoryName', minWidth: 100, ellipsis: { tooltip: true } },
  {
    title: '最后更新时间',
    key: 'lastUpdateDate',
    width: 180,
    render(row) {
      return h('span', formatDateTime(row['lastUpdateDate']))
    },
  },
  {
    title: '是否可见',
    key: 'visibleFlag',
    width: 100,
    align: 'center',
    render(row) {
      return h(NSwitch, {
        size: 'small',
        rubberBand: false,
        value: row['visibleFlag'],
        loading: !!row.publishing,
        onUpdateValue: () => handlePublish(row),
      })
    },
  },
  {
    title: '操作',
    key: 'actions',
    width: 280,
    align: 'center',
    fixed: 'right',
    render(row) {
      return [
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            secondary: true,
            onClick: () => handleView(row),
          },
          { default: () => '查看', icon: renderIcon('majesticons:eye-line', { size: 14 }) }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 15px;',
            onClick: () => handleEdit(row.productCategoryId),
          },
          { default: () => '编辑', icon: renderIcon('material-symbols:edit-outline', { size: 14 }) }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'error',
            style: 'margin-left: 15px;',
            onClick: () => handleDelete(row.productCategoryId),
          },
          { default: () => '删除', icon: renderIcon('material-symbols:delete-outline', { size: 14 }) }
        ),
      ]
    },
  },
]
// 选中事件
function onChecked(rowKeys) {
  if (rowKeys.length) $message.info(`选中${rowKeys.join(' ')}`)
}

// 发布
function handlePublish(row) {
  if (isNullOrUndef(row.productCategoryId)) return
  row.visibleFlag = !row.visibleFlag
  row.publishing = true
  api.edit(row).then((res) => {
    row.publishing = false
    $message?.success(row.visibleFlag ? '已可见' : '已隐藏')
  })
}

const {
  modalVisible,
  modalAction,
  modalTitle,
  modalLoading,
  dataLoading,
  handleAdd,
  handleDelete,
  handleEdit,
  handleView,
  handleSave,
  modalForm,
  modalFormRef,
} = useCRUD({
  name: '分类',
  initForm: {
    productCategoryName: '',
    sortNo: 1,
    visibleFlag: false,
  },
  doCreate: api.addCategory,
  doDelete: api.delete,
  doUpdate: api.edit,
  getDetail: api.getDetailById,
  refresh: () => $table.value?.handleSearch(),
})
</script>
