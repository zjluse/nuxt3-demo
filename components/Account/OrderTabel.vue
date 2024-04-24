<template>
  <UITabs :tabs="projectType" v-model:currentType="currentType" />
  <DataTable
    :value="computedOrdrerList"
    showGridlines
    size="normal"
    scrollable
    scrollHeight="400px"
    tableStyle="margin-top: 4px; font-size: 12px"
    tableClass="my-app-table"
    :pt="{
      thead: 'common-table-thead',
      headerRow: 'common-table-headercell',
    }"
    v-model:selection="selectedProduct"
    selectionMode="single"
    @row-click="onRowClick"
  >
    <Column field="ordernum" header="批次"></Column>
    <Column field="device" header="设备名称" v-if="currentType === 0" style="min-width: 120px"></Column>
    <Column field="volume" header="份额/台" style="min-width: 70px"></Column>
    <Column field="amount" header="当前估值" style="min-width: 90px">
      <template #body="slotProps">
        {{ bigNumber.ToFixed_DOWN(new BigNumber(slotProps.data.amount).plus(slotProps.data.profit), 2) }}
      </template>
    </Column>
    <Column field="hash" header="算力" style="min-width: 80px" v-if="currentType === 0"></Column>
    <Column field="category" header="产出(BTC)/日" style="min-width: 110px" v-if="currentType === 0">
      <template #body="slotProps">
        {{ bigNumber.ToFixed_DOWN(slotProps.data.hash * 0.000003 * ((100 - slotProps.data.management_fee)/100), 8) }}
      </template>
    </Column>
    <Column field="management_fee" header="预期总收益(USDT)" v-if="currentType === 1"></Column>
    <Column field="invalid_datetime" header="解锁日期" v-if="currentType === 1">
      <template #body="slotProps">
        {{ useDateFormat(slotProps.data.invalid_datetime, 'YYYY-MM-DD').value }}
      </template>
    </Column>
    <Column field="status" header="状态" style="width: 70px">
      <template #body="slotProps">
        {{ slotProps.data.status }}
      </template>
    </Column>
    <Column field="profit" header="当前总收益" v-if="currentType === 1" style="min-width: 120px"></Column>
    <Column field="xxx" header="剩余电费(USDT)" style="min-width: 120px"  v-if="currentType === 0">
      <!--  -->
    </Column>
    <Column field="insert_datetime" header="认购日期" style="min-width: 100px">
      <template #body="slotProps">
        {{ useDateFormat(slotProps.data.insert_datetime, 'YYYY-MM-DD').value }}
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import { BigNumber } from "bignumber.js";
import { useDateFormat } from "@vueuse/core";

const emit =  defineEmits(['OnRowClick', 'OnProjectTypeChange']);
const { FPOrderList, getFPOrderList } = useFinlsProjectList();

const projectType = [
  { type: 0, name: "矿机托管服务" }, { type: 1, name: "矿机租赁服务" },
];
const selectedProduct = ref();
const currentType = ref(0);
const computedOrdrerList = computed(() => {
  return FPOrderList.value.filter((i) => i.projectBean.type == currentType.value);
});
watch(currentType, () => {
  emit('OnProjectTypeChange', currentType.value);
});

const onRowClick = (item) => {
  emit('OnRowClick', item);
};

onMounted(() => {
  nextTick(async () => {
    try {
      getFPOrderList();
    } catch (err) {}
  });
});
</script>

<style scoped lang="scss"></style>
