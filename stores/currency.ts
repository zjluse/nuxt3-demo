import { getCurrencyList } from "~/api/common";

export const useCurrencyStore = defineStore(
  "currency",
  () => {
    const frenchCurrency = ref({
      title: "$",
      rate: "1",
      symbol: "USD",
    });

    const exchangeRate = ref<any>({});

    const currencyList = ref([]);

    async function getCurrencyData(params: any) {
      try {
        const { list } = await getCurrencyList(params);
        currencyList.value = list;
        const currency = list.find(
          (item: any) => item.symbol == frenchCurrency.value.symbol
        );
        currency && (frenchCurrency.value = currency);
      } catch (error) {}
    }
    async function getExchangeRate() {
      try {
        let obj:any = {};
        const { list } = await getCurrencyList({ type: 2 });
        list.forEach((i:any) => obj[i.symbol] = i);
        exchangeRate.value = obj;
      } catch (error) {}
    }

    return { frenchCurrency, currencyList, getCurrencyData, exchangeRate, getExchangeRate };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    }
  }
);
