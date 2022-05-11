<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { GPagination } from '@/components';
import IPagination from '@/interfaces/IPagination';

interface Props {
  pagination: IPagination | null;
  loading: boolean;
  isCollapsed: any;
}

const offsetTop = ref(0);
const props = defineProps<Props>();
const emit = defineEmits(['handleOnChange']);

function handleOnChange(page, pageSize) {
  emit('handleOnChange', page, pageSize);
}

function updateOffsetTop() {
  const element: HTMLElement = document.querySelector('.g-table') as HTMLElement;
  if (element !== null && element?.offsetTop) {
    offsetTop.value = element.offsetTop;
  }
}

onMounted(updateOffsetTop);

watch(() => props.isCollapsed, updateOffsetTop);
</script>

<template>
  <div class="relative g-table" :style="{ height: `calc(100vh - ${offsetTop}px` }">
    <slot name="tableContent" />
    <div
      v-if="pagination && pagination.total"
      class="absolute bottom-0 w-full flex items-center justify-between g-table__footer pr-4"
    >
      <div>
        <slot name="footerRight" />
      </div>
      <div v-if="pagination" class="flex items-center">
        <span class="title-page-size" :class="{ 'is-loading': loading }">Bản ghi / trang</span>
        <g-pagination v-bind="pagination" :disabled="loading" @change="handleOnChange">
          <template #buildOptionText="objectProps">
            <span>{{ objectProps.value }}</span>
          </template>
        </g-pagination>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.g-table {
  .ant-table-wrapper {
    height: calc(100% - 64px);
    overflow: auto;

    .ant-table {
      font-size: 0.875rem;
      @media only screen and (min-width: 1600px) {
        font-size: 1rem;
      }

      .ant-table-container {
        border-color: rgb(0 0 0 / 25%) !important;
      }

      table {
        border-top: 0 !important;

        th {
          border-top: 1px solid rgb(0 0 0 / 25%);
        }
      }

      .ant-table-thead {
        position: sticky;
        top: 0;
        z-index: 1;
      }

      .ant-table-thead > tr > th {
        font-weight: 700;
        line-height: 19px !important;
      }

      .ant-table-thead > tr > th,
      .ant-table-tbody > tr > td,
      .ant-table tfoot > tr > th,
      .ant-table tfoot > tr > td {
        vertical-align: top;
        padding: 10px 8px !important;
        line-height: 20px;
        border-color: rgb(0 0 0 / 25%) !important;

        @media only screen and (min-width: 1600px) {
          padding: 15px 10px !important;
          line-height: 24px;
        }
      }
    }
  }

  .g-table__footer {
    height: 64px;
    border: 1px solid rgb(0 0 0 / 25%);

    .title-page-size {
      margin-right: calc(0.5rem + 72px + 1rem);

      &.is-loading {
        opacity: 0.5;
      }
    }

    .ant-pagination {
      position: relative;

      .ant-pagination-options {
        position: absolute;
        left: calc(-72px - 1rem);
        margin-left: 0;

        .ant-pagination-options-size-changer {
          width: 72px;
        }
      }
    }
  }
}
</style>
