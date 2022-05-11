<script lang="ts">
import { Input as AInput } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';
import { nanoid } from 'nanoid';

export default defineComponent({
  name: 'GInput',
  components: {
    AInput,
  },
  props: {
    value: {
      type: String,
      default: '',
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
  emits: ['on-click', 'on-change', 'on-blur', 'update:modelValue'],
  setup(props, { emit }) {
    const isFocused = ref(false);
    const id = ref(`g-input__${nanoid()}`);

    const onChangeInputValue = (event) => {
      emit('on-change', event.target.value);
      emit('update:modelValue', event.target.value);
    };
    const onFocus = () => {
      isFocused.value = true;
    };
    const onBlur = () => {
      isFocused.value = false;
      emit('on-blur');
    };
    const onClick = () => {
      emit('on-click');
    };
    const onClickPlaceholder = () => {
      const element: any = document.querySelector(`#${id.value} .ant-input`);
      if (element) {
        element.focus();
      }
    };
    return {
      id,
      isFocused,
      onChangeInputValue,
      onFocus,
      onBlur,
      onClick,
      onClickPlaceholder,
    };
  },
});
</script>
<template>
  <div :id="id" class="relative g-input" :class="{ 'has-value': value, 'is-focused': isFocused }">
    <a-input
      v-bind="$attrs"
      :placeholder="showLabelTop ? '' : placeholder"
      class="rounded"
      @input="onChangeInputValue"
      @blur="onBlur"
      @focus="onFocus"
      @click="onClick"
    >
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix" />
      </template>
      <template v-if="$slots.suffix" #suffix>
        <slot name="suffix" />
      </template>
    </a-input>
    <div
      v-if="showLabelTop"
      class="g-input__placeholder"
      :class="{ 'has-prefix': $slots.prefix }"
      @click.stop="onClickPlaceholder"
    >
      {{ placeholder }}
    </div>
  </div>
</template>

<style lang="scss">
.g-input {
  .g-input__placeholder {
    color: rgb(0 0 0 / 25%);
    cursor: inherit;
    position: absolute;
    top: 50%;
    left: 11px;
    transform: translateY(-50%);
    z-index: 1;
    transition: 0.15s linear;
    width: calc(100% - 11px);

    &.has-prefix {
      left: 36px;
      width: calc(100% - 36px);
    }
  }

  &.is-focused,
  &.has-value {
    .g-input__placeholder {
      top: 0;
      font-size: 80%;
      background-color: #fff;
      padding: 0 2px;
      z-index: 1;
      width: max-content;
    }
  }
}
</style>
