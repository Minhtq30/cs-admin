<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import GFilterGroup, { updateFilterOptions } from '@/components/common/GFilterGroup.vue';
import { GButton } from '@/components';
import { filterConfigs } from './configs';

export default defineComponent({
  components: {
    GFilterGroup,
    GButton,
  },
  props: {
    isCollapsed: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['handle-search', 'toogle-is-collapsed'],
  setup(props, { emit }) {
    const state = reactive({
      filterValue: {} as object,
      filtersKey: 0 as number,
      filterOption: filterConfigs as Array<any>,
      loadingAsyncOptions: {} as object,
    });

    const resetFilter = () => {
      state.filtersKey++;
      state.filterValue = {};
    };
    const handleChange = (key, value) => {
      state.filterValue = {
        ...state.filterValue,
        [key]: value,
      };
    };
    const searchByFilter = () => {
      emit('handle-search', state.filterValue);
    };
    function toogleIsCollapsed() {
      emit('toogle-is-collapsed');
    }
    return { ...toRefs(state), handleChange, resetFilter, searchByFilter, toogleIsCollapsed };
  },
  mounted() {
    const provinceOptions = [
      { value: '1', label: 'Hà Nội 1' },
      { value: '2', label: 'Hồ Chí Minh 1' },
      { value: '3', label: 'Đà Nẵng 1' },
    ];
    this.loadingAsyncOptions = {
      ...this.loadingAsyncOptions,
      province: true,
    };
    setTimeout(() => {
      this.loadingAsyncOptions = {
        ...this.loadingAsyncOptions,
        province: false,
      };
      this.filterOption = updateFilterOptions([...this.filterOption], 'province', provinceOptions);
    }, 1500);
  },
});
</script>
<template>
  <div class="list-shops-filter" :class="{ 'is-collapsed': isCollapsed }">
    <g-filter-group
      :key="filtersKey"
      :filterOption="filterOption"
      :filterValue="filterValue"
      :loadingAsyncOptions="loadingAsyncOptions"
      @on-change-filter-group="handleChange"
    />
  </div>
  <div class="flex justify-between items-center mt-4">
    <slot name="total" />
    <div>
      <g-button :disabled="loading" type="text" @click="resetFilter">Xóa bộ lọc</g-button>
      <g-button
        :disabled="loading"
        class="mx-4"
        type="primary"
        ghost
        style="width: 140px"
        @click="toogleIsCollapsed"
      >
        {{ isCollapsed ? 'Mở rộng bộ lọc' : 'Thu gọn bộ lọc' }}
      </g-button>
      <g-button :disabled="loading" type="primary" @click="searchByFilter">Tìm kiếm</g-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list-shops-filter {
  &.is-collapsed {
    height: 33px;
    overflow: hidden;
  }
}
</style>
