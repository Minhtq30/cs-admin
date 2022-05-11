<script lang="ts">
import { Select as ASelect, Input as GInput } from 'ant-design-vue';
import { computed, defineComponent, ref } from 'vue';
import { DownOutlined, LoadingOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'GSelect',
  components: {
    ASelect,
    GInput,
    DownOutlined,
    LoadingOutlined,
  },
  props: {
    value: {
      type: Object,
      default() {
        return {};
      },
    },
    showLabelTop: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['on-change', 'update:modelValue'],
  setup(props: any, { attrs, emit }: { attrs: any; emit: any }) {
    const isOpen = ref(false);

    function getTitle(_value = '') {
      let _title = _value;

      for (const option of attrs.options) {
        if (option?.value?.toString() === _value.toString()) {
          _title = option.label;
          break;
        }
      }

      return _title;
    }

    const placeholder = computed(() => {
      return attrs.placeholder || '';
    });

    const labelText = computed(() => {
      const value = props?.value;

      if (!value || !value.length) return '';

      if (attrs.mode) {
        if (value.length === 1) {
          return getTitle(value[0]);
        }
        return `${value.length} ${attrs?.placeholder}`;
      }

      return getTitle(value);
    });

    const onChange = (value: any) => {
      emit('on-change', value);
      emit('update:modelValue', value);
      if (!attrs.mode) {
        isOpen.value = false;
      }
    };

    const dropdownVisibleChange = (_isOpen) => {
      isOpen.value = _isOpen;
    };

    return {
      isOpen,
      placeholder,
      labelText,
      dropdownVisibleChange,
      onChange,
    };
  },
});
</script>
<template>
  <div class="relative g-select" :class="{ 'has-value': !!labelText, 'is-open': isOpen }">
    <g-input
      readonly
      class="w-full g-select__input"
      :placeholder="showLabelTop ? '' : placeholder"
      :value="labelText"
      :disabled="!!$attrs.loading"
    />
    <div v-if="showLabelTop" class="absolute g-select__placeholder">
      {{ placeholder }}
    </div>
    <down-outlined v-if="!$attrs.loading" class="absolute" />
    <loading-outlined v-else class="absolute" />
    <a-select
      class="rounded"
      v-bind="$attrs"
      @dropdown-visible-change="dropdownVisibleChange"
      @change="onChange"
    />
  </div>
</template>

<style lang="scss">
.g-select {
  &:hover > .ant-input {
    border: 1px solid #209e63;
  }

  .g-select__placeholder {
    color: rgb(0 0 0 / 25%);
    top: 50%;
    left: 11px;
    width: 100%;
    transform: translateY(-50%);
    transition: 0.15s linear;
  }

  &.has-value,
  &.is-open {
    .g-select__placeholder {
      top: 0;
      font-size: 80%;
      background-color: #fff;
      visibility: visible;
      z-index: 1;
      padding: 0 2px;
      width: max-content;
    }
  }

  .g-select__input:focus {
    border: 1px solid red;
  }

  .anticon {
    right: 11px;
    top: 50%;
    transform: translateY(-50%);
    color: #00000040;

    svg {
      width: 12px;
    }
  }

  .ant-select {
    opacity: 0;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;

    .ant-select-selection-overflow {
      display: none;
    }
  }
}
</style>
