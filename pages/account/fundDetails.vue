<template>
  <div class="fund-details">
    <div class="container-box">
      <div class="common-box-title title">资金明细</div>
      <!-- tabs -->
      <UITabs :tabs="recordType" v-model:currentType="currentType" />
      <!-- search -->
      <div class="coin-transaction-record">
        <p class="sub-title">详情</p>
        <!-- component -->
        <RecordPool v-if="currentType == 1" />
        <RecordSuperComputer v-if="currentType == 2" />
        <RecordDeposit v-if="currentType == 3" />
        <RecordFlash v-if="currentType == 4" />
        <RecordTransfer v-if="currentType == 5" />
        <RecordCurrencyIn v-if="currentType == 6" />
        <RecordCurrencyOut v-if="currentType == 7" />
        <RecordTransferInner v-if="currentType == 8" />
      </div>
    </div>
  </div>
</template>

<script setup>
// <component :is="recordPool" :query="query"></component>
// const recordPool = resolveComponent("RecordPool");

const currentType = ref(1);
const recordType = [
  { type: 1, name: "矿池收益", query: { path: 1, status: 5, type: 10 } },
  { type: 2, name: "超算收益", query: { path: 1, status: 5, type: 9 } },
  { type: 3, name: "充币/提币", query: { type: 7 } },
  { type: 4, name: "闪兑记录", query: { path: 2, type: 6 } },
  { type: 5, name: "划转记录", query: {} },
  { type: 6, name: "法币存款", query: { path: 1 } },
  { type: 7, name: "法币取款", query: { path: 2 } },
  { type: 8, name: "内部转账", query: { type: 18 } },
];
</script>

<style scoped lang="scss">
.fund-details {
  margin-left: 17px;
  margin-bottom: 30px;
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
</style>

<style lang="scss">
.coin-transaction-record {
  .sub-title {
    font-size: 16px;
    margin-left: 12px;
    margin-top: 40px;
    margin-bottom: 20px;
  }
  .record-list {
    max-height: 500px;
    overflow: auto;
    .record-item {
      padding: 20px 12px;
      border-bottom: 1px solid #e1e1e1;
      &:nth-child(1) {
        border-top: 1px solid #000;
      }
      .time {
        font-size: 12px;
        display: inline-block;
        margin-top: 14px;
      }
    }
  }
}
</style>
