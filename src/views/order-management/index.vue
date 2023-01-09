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
      <template #queryBarInput>
        <QueryBarItem label="订单状态" :label-width="80">
          <n-select v-model:value="queryItems.orderSiteStatus" clearable :options="statusOptions" />
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
            label="订单编号"
            path="orderNum"
            :rule="{
              required: true,
              message: '请输入分类名称',
              trigger: ['input', 'blur'],
            }"
          >
            <n-input v-model:value="modalForm.orderNum" placeholder="请输入分类名称" />
          </n-form-item>
          <n-form-item
            label="订单状态"
            :rule="{
              required: true,
              message: '请输入排序',
              trigger: ['input', 'blur'],
            }"
          >
            <n-select v-model:value="modalForm.orderSiteStatus" clearable :options="statusOptions" />
          </n-form-item>
          <n-form-item
            label="下单用户"
            path="shipAddressUserName"
            :rule="{
              required: true,
              message: '请输入分类名称',
              trigger: ['input', 'blur'],
            }"
          >
            <n-input v-model:value="modalForm.shipAddressUserName" placeholder="请输入分类名称" />
          </n-form-item>
          <n-form-item label="订单总价" path="totalPrice">
            <n-input-number v-model:value="modalForm.totalPrice" :min="0" :precision="2" w-screen>
              <template #prefix> ￥ </template>
            </n-input-number>
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

const statusOptions = ref([
  {
    label: '待处理',
    value: 'PENDING',
  },
  {
    label: '待发货',
    value: 'TO_DELIVER',
  },
  {
    label: '配送中',
    value: 'DELIVERING',
  },
  {
    label: '已完成',
    value: 'FINISHED',
  },
])

const validateSort = (value) => {
  value && value >= 0
}

const columns = [
  { title: '订单编号', key: 'orderNum', minWidth: 160, ellipsis: { tooltip: true } },
  {
    title: '订单状态',
    key: 'orderSiteStatus',
    width: 180,
    render(row) {
      return h('span', formatSiteStatus(row['orderSiteStatus']))
    },
  },
  {
    title: '订单总价',
    key: 'totalPrice',
    width: 100,
    ellipsis: { tooltip: true },
    render(row) {
      return `￥${row['totalPrice']}`
    },
  },
  { title: '下单用户', key: 'shipAddressUserName', width: 120, ellipsis: { tooltip: true } },
  {
    title: '下单时间',
    key: 'orderDate',
    width: 180,
    render(row) {
      return h('span', formatDateTime(row['orderDate']))
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
        // h(
        //   NButton,
        //   {
        //     size: 'small',
        //     type: 'primary',
        //     style: 'margin-left: 15px;',
        //     onClick: () => handleEdit(row.productCategoryId),
        //   },
        //   { default: () => '编辑', icon: renderIcon('material-symbols:edit-outline', { size: 14 }) }
        // ),
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
function formatSiteStatus(status) {
  let statusValue = ''
  switch (status) {
    case 'PENDING':
      statusValue = '待处理'
      break
    case 'TO_DELIVER':
      statusValue = '待发货'
      break
    case 'DELIVERING':
      statusValue = '配送中'
      break
    case 'FINISHED':
      statusValue = '已完成'
      break
    default:
      break
  }
  return statusValue
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
  name: '订单',
  initForm: {
    orderNum: '',
    orderSiteStatus: '',
    shipAddressUserName: '',
    totalPrice: '',
  },
  doCreate: api.addCategory,
  doDelete: api.delete,
  doUpdate: api.edit,
  getDetail: api.getDetailById,
  refresh: () => $table.value?.handleSearch(),
})
</script>
