export const useCountStore = defineStore('count', () => {
  const count = ref(1);

  const doubleCount = computed(() => count.value * 2);

  function increment(value: number) {
    count.value += value;
  }

  return { count, doubleCount, increment };
})
