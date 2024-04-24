<template>
  <ul class="record-list">
    <li class="record-item" v-for="item in recordList" :key="item.id">
      <div class="flex-x-between">
        <span style="font-size: 16px;">{{ item.tranid }}</span>
        <span>{{ item.insert_datetime }}</span>
      </div>
      <div class="flex-x-between" style="margin-top: 6px;">
        <div>收款方式：{{ payNameText[item.to.pay] }}</div>
        <div>账户类型：{{ getaccountType(item.from) }}</div>
      </div>
      <div class="flex-x-between" style="margin-top: 6px;">
        <div>数量：{{ bigNumber.ToFixed_DOWN(item.amount, 2) }}</div>
        <div>状态：{{ statusText[item.status] }}</div>
      </div>
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
  path: 2,
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
};
const payNameText= {
  '1': '银行卡',
  '2': '微信',
  '3': '支付宝',
};
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
};

const getRecordList = async () => {
  try {
    const {total, list} = await getCashRecordList({...queryParams, pageNum: queryParams.pageNum + 1});
    totalRecords.value = total;
    list.forEach(item => {
      item.to = (item.to ? JSON.parse(item.to) : {})
      item.from = (item.from ? JSON.parse(item.from) : {})
    });
    recordList.value = list;
  } catch (e) {}
};

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