<template>
  <ul class="record-list">
    <li class="flex-x-between-start record-item" v-for="item in recordList" :key="item.id">
      <div>
        <p>{{ '矿池数据服务' }}</p>
        <span class="time">{{ item.insert_datetime }}</span>
      </div>
      <div>{{ item.path == 2 ? '-' : '+' }}{{ item.amount }} {{ item.symbol }}</div>
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
  path: 1,
  status: 5,
  type: 10
});
const recordList = ref([]);

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