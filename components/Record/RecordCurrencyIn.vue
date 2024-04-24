<template>
  <ul class="record-list">
    <li class="record-item" v-for="item in recordList" :key="item.id">
      <div class="flex-x-between">
        <span style="font-size: 16px;">{{ item.tranid }}</span>
        <span>{{ item.insert_datetime }}</span>
      </div>
      <div class="flex-x-between" style="margin-top: 6px;">
        <div>金额：{{ bigNumber.ToFixed_DOWN(item.amount, 2) }}USD</div>
        <div>类型：{{ item.path == 1 ? '用户充值' : '用户提款' }}</div>
      </div>
      <div class="flex-x-between" style="margin-top: 6px;">
        <div>状态：{{ statusText[item.status] }}</div>
        <div>账户类型：{{ getaccountType(item.to) }}</div>
      </div>
      <div style="margin-top: 6px;">法币名称：{{ item.currency }}</div>
    </li>
  </ul>
  <!-- page -->
  <Paginator v-model:first="queryParams.pageNum" :rows="queryParams.pageSize" :totalRecords="totalRecords"></Paginator>
</template>

<script setup>
import { getCashRecordList } from '~/api/user';

const props = defineProps({})

const totalRecords = ref(0);
const queryParams = reactive({
  startDate: '',
  pageSize: 10,
  pageNum: 0,
  path: 1,
});
const recordList = ref([]);

const statusText = {
  '1': '待审核',
  '2': '已审核',
  '3': '待处理',
  '4': '处理中',
  '5': '已完成',
  '6': '已驳回',
  '7': '草稿（未提交）',
  '8': '待撤销',
  '9': '已撤销',
}
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
    const {total, list} = await getCashRecordList({...queryParams, pageNum: queryParams.pageNum + 1});
    totalRecords.value = total;
    list.forEach(item => {
      item.to = (item.to ? JSON.parse(item.to) : {})
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