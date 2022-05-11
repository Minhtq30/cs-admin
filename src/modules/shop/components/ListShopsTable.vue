<script setup lang="ts">
import { Table as ATable, Select as GSelect, Modal as GModal } from 'ant-design-vue';
import { FormOutlined } from '@ant-design/icons-vue';
import { GButton, GTag, GInput } from '@/components';
import { reactive, ref } from 'vue';
import { message } from 'ant-design-vue';

import { tableColumns, shopStatusOptions } from './configs';
import { getStatusLabel } from './utils';

const GTextarea = GInput.TextArea;

interface Props {
  dataSource: Array<any>;
  loading: boolean;
}

const visibleModalStatus = ref<boolean>(false);
const loadingChangeStatus = ref<boolean>(false);

// eslint-disable-next-line
const props = defineProps<Props>();
const emits = defineEmits(['updateData']);

const state = reactive<any>({
  selectedShop: null,
  tempStatus: null,
  statusOptions: [],
  reason_stop: '',
});

const noteById = reactive({});
const loadingSaveNote = reactive({});

function handleSaveNote(record) {
  loadingSaveNote[record.id] = true;

  const now = new Date();

  const date = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear();

  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  setTimeout(() => {
    emits('updateData', record.id, {
      cs_notes: record.cs_notes.concat(
        `(${date}/${month}/${year} ${hours}:${minutes}) ${noteById[record.id]}`
      ),
    });

    loadingSaveNote[record.id] = false;
    noteById[record.id] = '';

    message.success(`Thêm ghi chú cho shop ${record.name} thành công!`);
  }, 1000);
}

function openModalChangeStatus(record) {
  state.selectedShop = record;
  state.statusOptions = shopStatusOptions.filter((o) => o.value !== record?.status_id);
  state.tempStatus = state.statusOptions[0].value;
  visibleModalStatus.value = true;
}

function closeModalChangeStatus() {
  visibleModalStatus.value = false;
}

function handleChangeTempStatus(status) {
  state.tempStatus = status;
}

function handleSubmitChangeStatus() {
  const shopId = state.selectedShop.id;
  loadingChangeStatus.value = true;

  setTimeout(() => {
    emits('updateData', shopId, {
      status_id: state.tempStatus,
      reason_stop: state.reason_stop || '',
    });

    loadingChangeStatus.value = false;
    state.reason_stop = '';
    visibleModalStatus.value = false;

    message.success(`Đổi trạng thái cho shop ${state.selectedShop?.name} thành công!`);
  }, 1000);
}
</script>

<template>
  <a-table
    :loading="loading"
    :row-key="(record) => record.key"
    :dataSource="dataSource"
    :columns="tableColumns"
    :pagination="false"
    :emptyText="'Danh sách trống'"
    bordered
  >
    <template #bodyCell="{ column, record }">
      <template v-if="dataSource">
        <template v-if="column.key === 'name'">
          <div class="mb-1">
            <g-tag color="#00904A">PRO</g-tag>
            <g-tag color="#AEB0B6">Pshop</g-tag>
          </div>
          <span class="font-medium">
            {{ record.name }}
          </span>
        </template>
        <template v-if="column.key === 'info'">
          <div><span class="font-medium">SDT:</span> {{ record.tel }}</div>
          <div><span class="font-medium">Email:</span> {{ record.email }}</div>
          <div><span class="font-medium">Địa chỉ đăng ký:</span> {{ record.address }}</div>
          <div>
            <span class="font-medium">Ngành hàng đăng ký:</span> {{ record.register_categories.join(',') }}
          </div>
          <div><span class="font-medium">Nguồn đăng ký:</span> {{ record.register_source }}</div>
          <div><span class="font-medium">Thời gian tạo:</span> {{ record.created_at }}</div>
        </template>
        <template v-if="column.key === 'feature'">
          <div>
            <span class="font-medium">Trạng thái:</span> {{ getStatusLabel(record.status_id) }}
            <span v-if="record.status_id === 2 && record.reason_stop">
              - Lý do: {{ record.reason_stop }}
            </span>
            <form-outlined
              class="cursor-pointer ml-2"
              style="color: #00904a"
              @click="() => openModalChangeStatus(record)"
            />
          </div>
          <div><span class="font-medium">Ngành hàng:</span> {{ record.categories.join(', ') }}</div>
          <div><span class="font-medium">Sản phẩm:</span> {{ record.product_categories.join(', ') }}</div>
          <div><span class="font-medium">Sản lượng:</span> {{ record.san_luong }} ĐH (Tháng 4/2022)</div>
        </template>
        <template v-if="column.key === 'care_shop'">
          <div><span class="font-medium">CSKH:</span> {{ record.cskh }}</div>
          <div><span class="font-medium">Resale:</span> {{ record.resale }}</div>
          <div><span class="font-medium">PK onsite:</span> {{ record.pk_onsite }}</div>
          <div><span class="font-medium">Kho phụ trách:</span> {{ record.warehouse }}</div>
        </template>
        <template v-if="column.key === 'cs_note'">
          <div v-for="(note, index) in record.cs_notes" :key="index">
            <span>{{ note }}</span>
          </div>
          <g-textarea v-model:value="noteById[record.id]" />
          <div class="mt-2 flex justify-end">
            <g-button
              ghost
              type="primary"
              :loading="loadingSaveNote[record.id]"
              :disabled="!noteById[record.id]"
              :size="'small'"
              @click="handleSaveNote(record)"
            >
              Lưu
            </g-button>
          </div>
        </template>
        <template v-if="column.key === 'action'">
          <g-button class="w-full mb-2" type="primary" ghost>Chỉnh sửa</g-button>
          <g-button class="w-full mb" type="primary" ghost>Đăng nhập</g-button>
        </template>
      </template>
    </template>
  </a-table>

  <g-modal
    v-model:visible="visibleModalStatus"
    centered
    :title="`Đổi trạng thái shop ${state.selectedShop?.name}`"
  >
    <template #footer>
      <g-button key="back" :disabled="loadingChangeStatus" @click="closeModalChangeStatus"> Hủy </g-button>
      <g-button key="submit" type="primary" :loading="loadingChangeStatus" @click="handleSubmitChangeStatus">
        Xác nhận
      </g-button>
    </template>
    <div class="flex items-center mb-2">
      <div class="mr-4" style="width: 150px">
        <b>Trạng thái hiện tại:</b>
      </div>
      <span>{{ getStatusLabel(state.selectedShop?.status_id) }}</span>
    </div>
    <div class="flex items-center mb-2">
      <div class="mr-4" style="width: 150px">
        <b>Trạng thái muốn đổi:</b>
      </div>
      <g-select
        class="flex-1"
        :value="state.tempStatus"
        :options="state.statusOptions"
        @change="handleChangeTempStatus"
      />
    </div>
    <div v-if="state.tempStatus === 2" class="flex items-center">
      <div class="mr-4" style="width: 150px">
        <b>Lý do tạm dừng:</b>
      </div>
      <g-textarea v-model:value="state.reason_stop" class="flex-1" />
    </div>
  </g-modal>
</template>
