<template>
  <div></div>
</template>

<script lang="ts">
import { GhtkAuth } from 'gmjs';
import config from '@/configs/app';
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  setup: async () => {
    const oidc = config.oidc;
    const ghtkAuth = new GhtkAuth(oidc);
    try {
      await ghtkAuth.signOut({
        revokeAccessToken: true,
        postLogoutRedirectUri: `${oidc.authnUrl}/sign-out?continue=${config.appUrl}`,
      });
    } catch (e) {
      window.location.href = `${oidc.authnUrl}/sign-out?continue=${config.appUrl}`;
    } finally {
      localStorage.clear();
    }
  },
});
</script>
