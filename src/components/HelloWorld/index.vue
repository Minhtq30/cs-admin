<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useCounterStore } from '@/store';

const counter = useCounterStore();
const router = useRouter();

defineProps<{ msg: string }>();

const timer = ref(0);

const handleLogin = async () => {
  router.push('/');
};
</script>

<template>
  <div class="content">
    <div>
      <router-link to="/">Go to homepage</router-link>
    </div>

    <h1>{{ msg }}</h1>

    <p>Store counter: {{ counter.payload }}</p>
    <button type="button" @click="counter.increment">Increment store</button>
    <button type="button" @click="timer++">timer is: {{ timer }}</button>

    <button type="button" @click="handleLogin">Try test service</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test hot module replacement.
    </p>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
