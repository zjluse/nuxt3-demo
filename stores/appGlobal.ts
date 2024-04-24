import { getProductList } from "~/api/common";

export const useAppGlobalStore = defineStore(
  "appGlobal",
  () => {
    const productDataList = ref<any>([]);

    async function getProductData() {
      try {
        // const data = new FormData();
        // data.append('symbol', JSON.stringify(['BTCUSD', 'ETHUSD']));
        // const { list } = await getProductList(data);
        // const { list } = await getProductList({symbol: JSON.stringify(['BTCUSD', 'ETHUSD'])});
        // const { list } = await getProductList({symbol: ['BTCUSD', 'ETHUSD']});
        // productDataList.value = list;

        const config = useRuntimeConfig();
        const formData = new FormData();
        formData.append('symbol', JSON.stringify(['BTCUSD', 'ETHUSD']));
        const response: any = await $fetch('https://api3.jdnx.com' + '/Public/getProductList', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${useUserStote().token}`
          },
          body: new URLSearchParams(formData as unknown as string).toString()
        });
        if (response.code == 200) {
          productDataList.value = response.data?.list; 
        }
      } catch (error) {}
    }

    return { productDataList, getProductData };
  },
  {}
);
