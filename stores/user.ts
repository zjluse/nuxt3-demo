export const useUserStote = defineStore('user', {
  state: () => ({
    token: '',
  }),

  actions: {
    saveToken(value: string) {
      this.token = value;
    },
  },
  // persist: true, // 默认cookie
  persist: {
    storage: persistedState.localStorage,
  },
});
