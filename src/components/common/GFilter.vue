<script lang="ts">
import { defineComponent } from 'vue';
import GDatePicker from '@/components/common/GDatePicker.vue';
import GInput from '@/components/common/GInput.vue';
import GSelect from '@/components/common/GSelect.vue';
import { SearchOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  components: {
    GInput,
    GSelect,
    GDatePicker,
    SearchOutlined,
  },
  props: {
    filter: {
      type: Object,
      required: true,
    },
    filterKey: {
      type: [String, Number],
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['on-change-filter-value'],
  setup(props, { emit }) {
    const onChangeValue = (value: string | object) => {
      emit('on-change-filter-value', props.filterKey, value);
    };
    return {
      onChangeValue,
    };
  },
});
</script>
<template>
  <component
    v-bind="filter.properties"
    :is="filter.type"
    :placeholder="filter.properties?.placeholder || ''"
    :loading="loading"
    @on-change="onChangeValue"
  >
    <template v-if="filter?.icons?.prefix?.type" #prefix>
      <component :is="filter.icons.prefix.type" :style="filter?.icons?.prefix?.style" />
    </template>
    <template v-if="filter?.icons?.suffix?.type" #suffix>
      <component :is="filter.icons.suffix.type" :style="filter?.icons?.suffix?.style" />
    </template>
  </component>
</template>
