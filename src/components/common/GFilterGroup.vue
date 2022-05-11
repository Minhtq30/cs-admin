<script lang="ts">
import { defineComponent } from 'vue';
import { Row as GRow, Col as GCol } from 'ant-design-vue';
import GFilter from '@/components/common/GFilter.vue';

export const updateFilterOptions = (options, key, value) => {
  const _options: Array<any> = [];

  for (const option of options) {
    const _items = option.items;

    if (_items[key]) {
      _options.push({
        ...option,
        items: {
          ..._items,
          [key]: {
            ..._items[key],
            properties: {
              ..._items[key].properties,
              options: value,
            },
          },
        },
      });
    } else {
      _options.push({
        ...option,
        items: _items,
      });
    }
  }

  return _options;
};

export default defineComponent({
  components: {
    GFilter,
    GRow,
    GCol,
  },
  props: {
    filterOption: {
      type: Object,
      required: true,
    },
    filterValue: {
      type: Object,
      default() {
        return {};
      },
      required: true,
    },
    loadingAsyncOptions: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: ['on-change-filter-group'],
  setup(props: any, { emit }) {
    const handleChangeFilterValue = (key: string, value: object | string): any => {
      emit('on-change-filter-group', key, value);
    };
    return {
      handleChangeFilterValue,
    };
  },
  watch: {
    filterValue(_filterValue) {
      console.log(_filterValue);
    },
  },
});
</script>
<template>
  <g-row :gutter="[16, 16]">
    <g-col v-for="(filter, filterIndex) in filterOption" :key="filterIndex" :span="filter.span">
      <g-row :gutter="[16, 16]">
        <g-col v-for="(item, filterKey) in filter.items" :key="filterKey" :span="item.span">
          <g-filter
            :loading="loadingAsyncOptions[filterKey]"
            :value="filterValue[filterKey] || null"
            :filter="item"
            :filter-key="filterKey"
            :style="{ width: '100%' }"
            @on-change-filter-value="handleChangeFilterValue"
          />
        </g-col>
      </g-row>
    </g-col>
  </g-row>
</template>
