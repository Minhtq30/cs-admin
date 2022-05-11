<script lang="ts" setup>
import { Header } from './components';
</script>

<template>
  <div id="__main">
    <div id="__header">
      <Header />
    </div>
    <div id="__content">
      <router-view />
    </div>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
