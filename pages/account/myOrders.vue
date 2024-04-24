<template>
  <div class="container-box my-orders">
    <div class="common-box-title title">我的订单</div>
    <AccountOrderTabel @OnRowClick="onRowClick" @OnProjectTypeChange="onProjectTypeChange" />

    <div class="order-detail" v-if="selectProduct">
      <UITabs :tabs="detailType" v-model:currentType="currentDt" style="margin-bottom: 4px;" />
      <DataTable
        :value="computedDataList"
        showGridlines
        size="normal"
        scrollable
        scrollHeight="400px"
        tableStyle="font-size: 12px"
        tableClass="my-app-table"
        :pt="{
          thead: 'common-table-thead',
          headerRow: 'common-table-headercell',
        }"
      >
        <Column field="insert_datetime" header="时间" style="width: 190px"></Column>
        <Column field="amount" header="金额">
          <template #body="slotProps">
            <i v-if="detailType == 1">+</i>{{ slotProps.data.amount }} {{ slotProps.data.symbol || 'USDT' }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { getWalletRecordList, getInvestmentRecordList } from '~/api/user';

const detailType = ref([
  { type: 1, name: "收益明细" }, { type: 2, name: "电费明细" },
]);
const currentDt = ref(1);
const profitList = ref([]);
const electricList = ref([]);
const selectProduct = ref(null);
const computedDataList = computed(() => {
  return currentDt.value == 1 ? profitList.value : currentDt.value == 2 ? electricList.value : [];
})

// const profitList
// const electricList
// const getWalletRecord = async () => {
//   return getWalletRecordList()
// };

const onRowClick = async ({ data }) => {
  selectProduct.value = data;
  if (data.model == 3) {
    Promise.all([
      getWalletRecordList({
        ordernum: data.ordernum, 
        path: 1, 
        status: 5, 
        type: 10
      }),
      getInvestmentRecordList({
        ordernum: data.ordernum,
        path: 2,
        status: 5,
        type: 108
      })
    ]).then(res => {
      profitList.value = res[0].list;
      electricList.value = res[1].list;
    })
  } else {
    Promise.all([
      getInvestmentRecordList({
        ordernum: data.ordernum,
        path: 1,
        status: 5,
        type: 9
      })
    ]).then(res => {
      profitList.value = res[0].list;
      electricList.value = [];
    })
  }
};

const onProjectTypeChange = (type) => {
  selectProduct.value = null;
  if (type == 0) {
    currentDt.value = 1;
    detailType.value = [{ type: 1, name: "收益明细" }, { type: 2, name: "电费明细" }];
  } else if (type == 1) {
    currentDt.value = 1;
    detailType.value = [{ type: 1, name: "收益明细" }];
  }
};
</script>

<style scoped lang="scss">
.my-orders {
  margin-left: 17px;
  margin-bottom: 40px;
  .title {
    font-size: 20px;
    margin-bottom: 26px;
  }
}

.container-box {
  background: #fff;
  border-radius: 16px;
  padding: 28px 32px;
}

.order-detail {
  margin-top: 36px;
  margin-bottom: 40px;
}
</style>