<template>
  <div class="common-page-bar stuff-page account-page">
    <div class="main-container flex-x-center-start" style="margin-top: 40px">
      <AccountMenus />
      <NuxtPage class="flex-1" style="width: 1px;" />
    </div>
  </div>
</template>

<script setup>
const { $emit } = useEmitter();
const { getCurrencyData, getExchangeRate } = useCurrencyStore();
const { isLogin, getUserBaseInfo, getWalletData, getInvestmentData } = useAccount();

onMounted(() => {
  if (isLogin.value) {
    nextTick(() => {
      getUserBaseInfo();
      getWalletData();
      getInvestmentData();
      getCurrencyData({ type: 1 }),
      getExchangeRate();
    });
  } else {
    $emit('OPEN-LOGIN-MODAL', '/account');
  }
});
</script>

<style lang="scss" scoped>
.stuff-page {
  min-height: calc(100vh - 120px);
}
.account-page {
  background: #ebebeb;
}
</style>
