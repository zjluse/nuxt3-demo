<template>
  <ul class="record-list">
    <li class="record-item" v-for="item in recordList" :key="item.id">
      <div class="flex-x-between">
        <span>划转账户：{{ getaccountType(item.from) }}</span>
        <span>数量：{{ bigNumber.ToFixed_DOWN(item.amount, 2) }}</span>
      </div>
      <div class="flex-x-between" style="margin-top: 12px;font-size: 12px;">
        <span>已完成</span>
        <span>{{ item.insert_datetime }}</span>
      </div>
      <div style="margin-top: 12px;">
        <span>到账账户：{{ getaccountType(item.to) }}</span>
      </div>
    </li>
  </ul>
  <!-- page -->
  <Paginator v-model:first="queryParams.pageNum" :rows="queryParams.pageSize" :totalRecords="totalRecords"></Paginator>
</template>

<script setup>
import { getBalanceTransferList } from '~/api/user';

const props = defineProps({})

const totalRecords = ref(0);
const queryParams = reactive({
  startDate: '',
  pageSize: 10,
  pageNum: 0,
});
const recordList = ref([]);

function getaccountType(item) {
  if (item.inv_type) {
    if (item.inv_type == 1) {
      return '金融账户'
    }
    return '预付金融账户'
  }
  if (item.account) {
    return '交易账户'
  }
  if (item.symbol) {
    return `数字钱包(${item.symbol})`
  }
}

const getRecordList = async () => {
  try {
    const {total, list} = await getBalanceTransferList({...queryParams, pageNum: queryParams.pageNum + 1});
    totalRecords.value = total;
    list.forEach(item => {
      item.to = (item.to ? JSON.parse(item.to) : {})
      item.from = (item.from ? JSON.parse(item.from) : {})
    });
    recordList.value = list;
  } catch (e) {}
}

watch(queryParams, () => {
  getRecordList();
});

onMounted(() => {
  nextTick(() => {
    getRecordList();
  });
})
</script>

<style scoped lang="scss">

</style>