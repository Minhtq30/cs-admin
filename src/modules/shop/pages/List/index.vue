<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { GStickyTable, GButton } from '@/components';
import { ListShopsTable, ListShopsFilter, ListShopsSkeleton } from '@/modules/shop/components';
import IPagination from '@/interfaces/IPagination';

interface IState {
  shops: Array<any> | null;
  isCollapsedFilter: boolean;
  filters: object;
}

const loading = ref<boolean>(false);

const state = reactive<IState>({
  shops: null,
  isCollapsedFilter: false,
  filters: {},
});

const pagination: IPagination = reactive({
  current: 1,
  total: 0,
  pageSize: 20,
  pageSizeOptions: ['10', '20', '50'],
});

async function getData(filters = {}) {
  console.log(filters);

  loading.value = true;

  try {
    setTimeout(() => {
      const totalItems = 20;

      const _dataSource: Array<any> = [];

      for (let index = 0; index < totalItems; index++) {
        _dataSource.push({
          id: index,
          key: index,
          name: 'Shop Phượng ớt S274563506',
          tel: '0865890068',
          email: 'tuyennguyen.maltco@gmail.com',
          address: 'Ngách 276/45, Phường Đại Kim, Quận Hoàng Mai, Hà Nội',
          register_categories: ['Thực phẩm chức năng'],
          register_source: 'Web khách hàng | Shop tự đăng ký',
          created_at: '15:47:18 25/04/2022',
          categories: ['Thực phẩm chức năng'],
          product_categories: ['Hàng chất lỏng dễ vỡ'],
          san_luong: 1000,
          status_id: 1,
          reason_stop: 'Shop vận chuyển hàng cấm',
          audit_type: 'Tự động Đối soát hàng ngày thứ 2,3,4,5,6',
          cskh: 'Nguyễn Thị Thu Hiền - hienntt112',
          resale: 'Chưa có',
          pk_onsite: 'Chưa có',
          warehouse: 'Kho Trần Phú (HN)',
          cs_notes: ['(25/4/2022 16:00) quent thêm ghi chú: 25/4/2022 hienntt112 care shop'],
        });
      }
      state.shops = _dataSource;
      pagination.total = 100;

      loading.value = false;
    }, 1500);
  } catch (error) {
    console.error(error);
  }
}

function handleOnChange(page, pageSize) {
  pagination.current = page;
  pagination.pageSize = pageSize;

  getData();
}

function toogleIsCollapsedFilter() {
  state.isCollapsedFilter = !state.isCollapsedFilter;
}

function handleSearch(filters) {
  getData(filters);
}

function updateShopById(shopId, dataUpdate) {
  if (!state.shops) return;

  const _shops: Array<any> = [];

  for (const shop of state.shops) {
    if (shop.id === shopId) {
      _shops.push({
        ...shop,
        ...dataUpdate,
      });
    } else {
      _shops.push(shop);
    }
  }

  state.shops = _shops;
}

onMounted(() => {
  getData();
});
</script>

<template>
  <div id="shops-page">
    <div class="mb-4">
      <div class="flex justify-between">
        <span class="text-2xl font-medium">Danh sách shop</span>
        <g-button type="primary" ghost> <plus-outlined /> Thêm shop mới </g-button>
      </div>
      <div class="my-4">
        <list-shops-filter
          :isCollapsed="state.isCollapsedFilter"
          :filters="state.filters"
          :loading="loading"
          @handle-search="handleSearch"
          @toogle-is-collapsed="toogleIsCollapsedFilter"
        >
          <template #total> Kết quả tìm kiếm: {{ pagination.total }} shops </template>
        </list-shops-filter>
      </div>
    </div>
    <g-sticky-table
      :pagination="pagination"
      :loading="loading"
      :isCollapsed="state.isCollapsedFilter"
      @handle-on-change="handleOnChange"
    >
      <template #tableContent>
        <list-shops-skeleton v-if="!state.shops" />
        <list-shops-table v-else :dataSource="state.shops" :loading="loading" @update-data="updateShopById" />
      </template>
    </g-sticky-table>
  </div>
</template>

<style lang="scss" scoped>
#shops-page {
  padding: 1rem 1rem 0;
}
</style>
