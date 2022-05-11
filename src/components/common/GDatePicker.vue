<script lang="ts">
import 'moment/locale/vi';
import locale from 'ant-design-vue/es/date-picker/locale/vi_VN';
import { defineComponent, reactive, toRefs } from 'vue';
import { CalendarOutlined } from '@ant-design/icons-vue';
import { DatePicker, Input } from 'ant-design-vue';
import { nanoid } from 'nanoid';
import moment from 'moment';

export default defineComponent({
  name: 'DatePicker',
  components: {
    ARangePicker: DatePicker.RangePicker,
    GInput: Input,
    CalendarOutlined,
  },
  props: {
    value: {
      type: [Object, String],
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
    showLabelTop: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['on-change', 'update:modelValue'],
  setup(props: any, { emit }) {
    const state = reactive({
      id: `g_date_picker_${nanoid()}`,
      isVisible: false,
      inputVal: '' as string,
    });
    const onClickInput = (event) => {
      if (state.isVisible) {
        event.preventDefault();
        return false;
      }
      const element: any = document.querySelector(`#${state.id} .ant-picker-range`);
      if (element) {
        element.click();
      }
    };

    const onChange = (value: object) => {
      if (!value || (value[0] && value[1])) {
        state.inputVal = `${moment(value[0]?.$d).format('DD/MM')} đến ${moment(value[1]?.$d).format(
          'DD/MM'
        )}`;
        emit('on-change', {
          fromDate: value ? value[0]?.$d : null,
          toDate: value ? value[1]?.$d : null,
        });
        emit('update:modelValue', value);
      }
    };
    const onOpenChange = (isVisible) => {
      state.isVisible = isVisible;
    };
    return {
      locale,
      ...toRefs(state),
      onChange,
      onOpenChange,
      onClickInput,
    };
  },
});
</script>

<template>
  <div :id="id" class="g-range-picker relative" :class="{ 'is-visible': isVisible, 'has-value': value }">
    <g-input readonly :value="inputVal" :placeholder="showLabelTop ? '' : placeholder" @click="onClickInput">
      <template #suffix>
        <calendar-outlined class="calendar-icon" />
      </template>
    </g-input>
    <div v-if="showLabelTop" class="w-full g-range-picker__placeholder" @click.stop="onClickInput">
      {{ placeholder }}
    </div>
    <a-range-picker
      class="rounded w-full absolute left-0"
      :locale="locale"
      @open-change="onOpenChange"
      @change="onChange"
    />
  </div>
</template>

<style lang="scss">
.g-range-picker {
  &:hover > .ant-input {
    border: 1px solid #209e63;
  }

  .g-range-picker__placeholder {
    cursor: inherit;
    position: absolute;
    top: 50%;
    left: 11px;
    transform: translateY(-50%);
    transition: 0.15s linear;
    z-index: 1;
    color: rgb(0 0 0 / 25%);
  }

  &.is-visible,
  &.has-value {
    .g-range-picker__placeholder {
      top: 0;
      font-size: 80%;
      background-color: #fff;
      padding: 0 2px;
      z-index: 1;
      width: max-content;
    }
  }

  .ant-picker-range {
    opacity: 0;
    z-index: -1;
    position: absolute;
    top: 0;
  }

  &.is-visible {
    &:hover > ant-input {
      border: 1px solid #209e63;
    }

    .ant-picker-range {
      z-index: 1;
    }
  }

  .calendar-icon {
    color: rgb(0 0 0 / 25%);
  }
}
</style>
