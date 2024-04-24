<template>
  <ul class="record-list">
    <li class="record-item" v-for="item in recordList" :key="item.id">
      <div class="flex-x-between">
        <div class="flex-x-start">
          <img :src="getImagUrl(item.symbol)" alt="" style="width: 30px; margin-right: 10px;" />
          <div class="flex-y-center-start">
            <p>{{ item.symbol }}</p>
            <span>转账网络：{{ item.from && JSON.parse(item.from).chain }}</span>
          </div>
        </div>
        <span>{{ item.path === 2 ? '充币' : '提币' }}数量：{{ bigNumber.ToFixed_DOWN(item.amount, item.path === 2 ? 2 : 6) }}</span>
      </div>
      <div class="flex-x-between" style="margin-top: 12px; font-size: 12px;">
        <span>状态：{{ statusText[item.status] }}</span>
        <span>{{ item.insert_datetime }}</span>
      </div>
      <div style="margin-top: 12px; font-size: 12px;">钱包地址：{{ item.from && JSON.parse(item.from).address || item.to && JSON.parse(item.to).address }}</div>
    </li>
  </ul>
  <!-- page -->
  <Paginator v-model:first="queryParams.pageNum" :rows="queryParams.pageSize" :totalRecords="totalRecords"></Paginator>
</template>

<script setup>
import { getWalletRecordList } from '~/api/user';

const props = defineProps({})

const totalRecords = ref(0);
const queryParams = reactive({
  startDate: '',
  pageSize: 10,
  pageNum: 0,
  type: 7
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
    getRecordList();
  });
})
</script>

<style scoped lang="scss">

</style>