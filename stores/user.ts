export const useUserStote = defineStore('user', {
  state: () => ({
    token: '0',
    userInfo: {},
  }),

  actions: {
    saveToken(value: string) {
      this.token = value;
    },
    saveUser(value) {
      this.userInfo = value;
    }
  },
  // persist: true, // 默认cookie
  persist: {
    storage: persistedState.localStorage,
  },
});
