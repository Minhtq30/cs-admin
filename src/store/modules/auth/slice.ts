import { defineStore } from 'pinia';

export const userInfoStore = defineStore('userInfo', {
  state: () => ({
    user: {},
  }),

  actions: {
    setUserInfo(userInfo) {
      this.user = userInfo;
    },
    getAuthUserInfo() {
      return this.user;
    },
  },
});
