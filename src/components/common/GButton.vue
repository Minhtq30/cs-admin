<script lang="ts">
import { Button as AButton } from 'ant-design-vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'GInput',
  components: {
    AButton,
  },
});
</script>
<template>
  <a-button class="rounded">
    <slot />
    <template #icon>
      <slot name="icon" />
    </template>
  </a-button>
</template>
