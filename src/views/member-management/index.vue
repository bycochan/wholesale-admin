<template>
  <CommonPage :show-header="false">
    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :extra-params="extraParams"
      :scroll-x="1000"
      :columns="columns"
      :get-data="api.getMembers"
      @on-checked="onChecked"
    >
      <template #queryBarBtn>
        <n-button type="primary" @click="handleAdd">
          <TheIcon icon="material-symbols:add" :size="18" class="mr-5" /> 添加会员
        </n-button>
      </template>
      <template #queryBarInput>
        <QueryBarItem label="用户名" :label-width="80">
          <n-input
            v-model:value="queryItems.username"
            type="text"
            placeholder="请输入用户名"
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
            label="用户名"
            path="username"
            :rule="{
              required: true,
              message: '请输入用户名',
              trigger: ['input', 'blur'],
            }"
          >
            <n-input v-model:value="modalForm.username" placeholder="请输入用户名" />
          </n-form-item>
          <n-form-item
            label="昵称"
            path="nickname"
            :rule="{
              required: true,
              message: '请输入昵称',
              trigger: ['input', 'blur'],
            }"
          >
            <n-input v-model:value="modalForm.nickname" placeholder="请输入昵称" />
          </n-form-item>
          <n-form-item
            label="手机号"
            path="phone"
            :rule="{
              required: true,
              message: '请输入手机号',
              trigger: ['input', 'blur'],
            }"
          >
            <n-input v-model:value="modalForm.phone" placeholder="请输入手机号" />
          </n-form-item>
          <n-form-item
            label="密码"
            path="encryptedPwd"
            :rule="{
              required: true,
              message: '请输入',
              trigger: ['input', 'blur'],
            }"
          >
            <n-input
              v-model:value="modalForm.encryptedPwd"
              type="password"
              show-password-on="mousedown"
              placeholder="请输入"
            />
          </n-form-item>
          <n-form-item label="是否冻结" path="frozen">
            <n-switch v-model:value="modalForm.frozen" />
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

const columns = [
  {
    title: '是否冻结',
    key: 'frozen',
    width: 80,
    align: 'center',
    fixed: 'left',
    render(row) {
      return h(NSwitch, {
        size: 'small',
        rubberBand: false,
        value: row['frozen'],
        loading: !!row.publishing,
        onUpdateValue: () => handlePublish(row),
      })
    },
  },
  { title: '用户名', key: 'username', minWidth: 80, ellipsis: { tooltip: true } },
  { title: '昵称', key: 'nickname', minWidth: 100, ellipsis: { tooltip: true } },
  { title: '手机号', key: 'phone', width: 150, ellipsis: { tooltip: true } },
  {
    title: '最后活跃时间',
    key: 'lastActiveDate',
    width: 180,
    render(row) {
      return h('span', formatDateTime(row['lastActiveDate']))
    },
  },
  {
    title: '操作',
    key: 'actions',
    width: 200,
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
            onClick: () => handleEdit(row.userId),
          },
          { default: () => '编辑', icon: renderIcon('material-symbols:edit-outline', { size: 14 }) }
        ),

        // h(
        //   NButton,
        //   {
        //     size: 'small',
        //     type: 'error',
        //     style: 'margin-left: 15px;',
        //     onClick: () => handleDelete(row.userId),
        //   },
        //   { default: () => '删除', icon: renderIcon('material-symbols:delete-outline', { size: 14 }) }
        // ),
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
  if (isNullOrUndef(row.userId)) return
  row.frozen = !row.frozen
  row.publishing = true
  api.updateMember(row).then((res) => {
    row.publishing = false
    $message?.success(row.frozen ? '已冻结' : '已生效')
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
  name: '会员',
  initForm: {
    nickname: '路人甲',
    username: 'a01',
    encryptedPwd: '',
    phone: '',
    frozen: false,
  },
  doCreate: api.addMember,
  doDelete: api.deleteMember,
  doUpdate: api.updateMember,
  getDetail: api.getMemberById,
  refresh: () => $table.value?.handleSearch(),
})
</script>
