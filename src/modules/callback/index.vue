<template>
  <div class="m-auto h-screen w-full flex justify-center items-center">
    <a-spin></a-spin>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { OAuth2CallbackHandler } from 'gmjs';
import config from '@/configs/app';
import { idService } from '@/services';
import { useRouter } from 'vue-router';
import { Spin as ASpin } from 'ant-design-vue';

import {} from '@/store';

import { userInfoStore } from '@/store';

const userModule = userInfoStore();

const oidc = config.oidc;
const router = useRouter();

onMounted(async () => {
  try {
    const handler = OAuth2CallbackHandler(oidc);
    const isSuccess = await handler.handle();
    const refererPath = handler.getRefererPath();
    if (isSuccess) {
      const userInfo = await idService.getUserInfo();
      userModule.setUserInfo(userInfo?.data);
      localStorage.setItem('user_info', JSON.stringify(userInfo?.data));
      router.push(refererPath || '/');
    }
  } catch (e) {
    console.error(e);
    router.push('/login');
  }
});
</script>
