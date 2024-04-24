<template>
  <ul class="record-list">
    <li class="record-item" v-for="item in recordList" :key="item.id">
      <div class="flex-x-between">
        <div class="flex-x-start">
          <img :src="getImagUrl(item.symbol)" alt="" style="width: 30px; margin-right: 10px;" />
          <span>{{ item.symbol }}</span>
        </div>
        <div class="flex-x-start">
          <img :src="item.to && getImagUrl(JSON.parse(item.to).symbol)" alt="" style="width: 30px; margin-right: 10px;" />
          <span>{{ item.to && JSON.parse(item.to).symbol }}</span>
        </div>
      </div>
      <div class="flex-x-between" style="margin-top: 12px;">
        <div class="flex-1">{{ item.amount }}</div>
        <div>闪兑-></div>
        <div class="flex-1" style="text-align: end;">{{ new BigNumber(item.amount).multipliedBy(item.rate) }}</div>
      </div>
      <div class="flex-x-between" style="margin-top: 12px;font-size: 12px;">
        <span>状态：{{ '已完成' }}</span>
        <span>{{ item.insert_datetime }}</span>
      </div>
    </li>
  </ul>
  <!-- page -->
  <Paginator v-model:first="queryParams.pageNum" :rows="queryParams.pageSize" :totalRecords="totalRecords"></Paginator>
</template>

<script setup>
import { BigNumber } from "bignumber.js";
import { getWalletRecordList } from '~/api/user';

const props = defineProps({})

const totalRecords = ref(0);
const queryParams = reactive({
  startDate: '',
  pageSize: 10,
  pageNum: 0,
  path: 2,
  type: 6
});
const recordList = ref([
  {symbol: 'USDT', to: '{"symbol":"BTC"}', amount: '1200030.12313', rate: 0.234, insert_datetime: '2020-01-01 10:10:10'}
]);

const getImagUrl = (symbol) => {
  return new URL(
    `/assets/images/coins/${symbol}.png`,
    import.meta.url
  );
};

const getRecordList = async () => {
  try {
    const response = await getWalletRecordList({...queryParams, pageNum: queryParams.pageNum + 1});
    totalRecords.value = response.total;
    recordList.value = response.list
  } catch (e) {}
}

watch(queryParams, () => {
  getRecordList();
});

onMounted(() => {
  nextTick(() => {
    // getRecordList();
  });
})
</script>

<style scoped lang="scss">

</style>