<script setup lang="ts">
import { Table as ATable, Skeleton as GSkeleton } from 'ant-design-vue';
import { tableColumns } from './configs';

const GSkeletonButton = GSkeleton.Button;
</script>

<template>
  <a-table
    :row-key="(record) => record.key"
    :dataSource="[{}, {}, {}]"
    :columns="tableColumns"
    :pagination="false"
    bordered
  >
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'name'">
        <div>
          <g-skeleton-button class="mr-2" :active="true" :size="'small'" />
          <g-skeleton-button :active="true" :size="'small'" />
        </div>
        <span class="font-medium">
          <g-skeleton class="mt-4" :active="true" :title="false" :paragraph="{ rows: 1 }" />
        </span>
      </template>
      <template v-if="column.key === 'info'">
        <g-skeleton :active="true" />
      </template>
      <template v-if="column.key === 'feature'">
        <g-skeleton :active="true" />
      </template>
      <template v-if="column.key === 'status'">
        <g-skeleton :active="true" />
      </template>
      <template v-if="column.key === 'care_shop'">
        <g-skeleton :active="true" />
      </template>
      <template v-if="column.key === 'cs_note'">
        <g-skeleton :active="true" />
      </template>
      <template v-if="column.key === 'action'">
        <g-skeleton-button class="mr-2 mb-2" :active="true" block />
        <g-skeleton-button class="mr-2" :active="true" block />
      </template>
    </template>
  </a-table>
</template>
