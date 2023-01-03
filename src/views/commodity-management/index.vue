<template>
  <CommonPage :show-header="false">
    <!-- 数据表格 -->
    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :extra-params="extraParams"
      :scroll-x="1200"
      :columns="columns"
      :get-data="api.getList"
      @on-checked="onChecked"
    >
      <template #queryBarBtn>
        <n-button type="primary" @click="handleAdd">
          <TheIcon icon="material-symbols:add" :size="18" class="mr-5" /> 添加商品
        </n-button>
      </template>
      <template #queryBarInput>
        <n-input
          v-model:value="queryItems.title"
          type="text"
          placeholder="请输入商品名称"
          clearable
          @keydown.enter="$table?.handleSearch"
        />
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
      <n-form
        ref="modalFormRef"
        label-placement="left"
        label-align="left"
        :label-width="80"
        :model="modalForm"
        :disabled="modalAction === 'view'"
      >
        <n-form-item
          label="商品名称"
          path="productName"
          :rule="{
            required: true,
            message: '请输入商品名称',
            trigger: ['input', 'blur'],
          }"
        >
          <n-input v-model:value="modalForm.productName" placeholder="请输入商品名称" />
        </n-form-item>
        <n-form-item label="商品分类" path="productCategoryId">
          <n-select
            v-model:value="modalForm.productCategoryId"
            label-field="productCategoryName"
            value-field="productCategoryId"
            :options="Data.categoryOptions"
          />
        </n-form-item>
        <n-form-item
          label="商品价格"
          path="originPrice"
          :rule="{
            required: true,
            message: '请输入商品价格',
            trigger: ['input', 'blur'],
            validator: validatePrince,
          }"
        >
          <n-input-number v-model:value="modalForm.originPrice" :min="0" :precision="2" w-screen>
            <template #prefix> ￥ </template>
          </n-input-number>
        </n-form-item>
        <n-form-item label="商品图片" path="imgUrl">
          <n-upload
            action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
            :file-list="modalForm.imgList"
            :max="1"
            list-type="image-card"
          >
            点击上传
          </n-upload>
        </n-form-item>
      </n-form>
    </CrudModal>
  </CommonPage>
</template>

<script setup>
import { NButton, NSwitch, NTag, NImage } from 'naive-ui'
import { formatDateTime, renderIcon, isNullOrUndef } from '@/utils'
import { useCRUD } from '@/composables'
import api from './api'
import { reactive } from 'vue'

defineOptions({ name: 'CrudTable' })

const $table = ref(null)
/** QueryBar筛选参数（可选） */
const queryItems = ref({})
/** 补充参数（可选） */
const extraParams = ref({})

onMounted(() => {
  $table.value?.handleSearch()
  getCategoryList()
})
const validatePrince = (value) => {
  value && value >= 0
}
const Data = reactive({
  categoryOptions: [],
})

const fileList = []

const columns = [
  {
    title: '上架',
    key: 'onSale',
    width: 60,
    align: 'center',
    fixed: 'left',
    render(row) {
      return h(NSwitch, {
        size: 'small',
        rubberBand: false,
        value: row['onSale'],
        loading: !!row.publishing,
        onUpdateValue: () => handlePublish(row),
      })
    },
  },
  {
    title: '商品图片',
    key: 'productCoverUrl',
    width: 100,
    render(row) {
      return h(NImage, {
        width: 64,
        'show-toolbar-tooltip': true,
        src: row['productCoverUrl'],
        'fallback-src': '../../../damage.svg',
      })
    },
  },
  { title: '商品名称', key: 'productName', minWidth: 100, ellipsis: { tooltip: true } },
  {
    title: '商品分类',
    key: 'productCategoryName',
    width: 80,
    render(row) {
      return h(
        NTag,
        {
          size: 'small',
          type: 'default',
        },
        { default: () => row['productCategoryName'] }
      )
    },
  },
  {
    title: '商品价格',
    key: 'originPrice',
    width: 80,
    render(row) {
      return `￥${row['originPrice']}`
    },
  },
  {
    title: '最后更新时间',
    key: 'lastUpdateDate',
    width: 180,
    render(row) {
      return h('span', formatDateTime(row['lastUpdateDate']))
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
            onClick: () => handleEdit(row.productId),
          },
          { default: () => '编辑', icon: renderIcon('material-symbols:edit-outline', { size: 14 }) }
        ),

        h(
          NButton,
          {
            size: 'small',
            type: 'error',
            style: 'margin-left: 15px;',
            onClick: () => handleDelete(row.id),
          },
          { default: () => '删除', icon: renderIcon('material-symbols:delete-outline', { size: 14 }) }
        ),
      ]
    },
  },
]

// 获取分类列表
async function getCategoryList() {
  const res = await api.getCategoryList()
  console.log(222, res)
  if (res.code === 0 && res.data) {
    console.log(res, Data.categoryOptions)
    Data.categoryOptions = JSON.parse(JSON.stringify(res.data))
  }
}

// 选中事件
function onChecked(rowKeys) {
  if (rowKeys.length) $message.info(`选中${rowKeys.join(' ')}`)
}

// 发布
function handlePublish(row) {
  if (isNullOrUndef(row.productId)) return
  row.onSale = !row.onSale
  row.publishing = true
  api.edit(row).then((res) => {
    row.publishing = false
    $message?.success(row.onSale ? '已上架' : '已下架')
  })
}

const {
  modalVisible,
  modalAction,
  modalTitle,
  modalLoading,
  handleAdd,
  handleDelete,
  handleEdit,
  handleView,
  handleSave,
  modalForm,
  modalFormRef,
} = useCRUD({
  name: '商品',
  initForm: {
    productName: '测试商品',
    productCategoryId: null,
    productSpec: 'test',
    originPrice: 0,
    onSale: true,
  },
  doCreate: api.add,
  doDelete: api.delete,
  doUpdate: api.edit,
  getDetail: api.getDetailById,
  refresh: () => $table.value?.handleSearch(),
})
</script>
