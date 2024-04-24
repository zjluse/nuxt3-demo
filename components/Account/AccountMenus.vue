<template>
  <div class="account-menus">
    <div class="menu-item">
      <div class="flex-x-start menu-title">
        <span class="icon"
          ><img src="~/assets/images/account_1.png" style="width: 19px"
        /></span>
        <span class="blod">个人中心</span>
      </div>
      <ul class="sub-menus">
        <!--  -->
        <li :class="[isActivedRoute('account') && 'actived']">
          <NuxtLinkLocale to="/account" class="menu-bar">
            <span class="menu-text">资产概览</span>
          </NuxtLinkLocale>
        </li>
        <li :class="[isActivedRoute('account-wallet') && 'actived']">
          <NuxtLinkLocale to="/account/wallet" class="menu-bar">
            <span class="menu-text">数字钱包</span>
          </NuxtLinkLocale>
        </li>
        <li :class="[isActivedRoute('account-fundDetails') && 'actived']">
          <NuxtLinkLocale to="/account/fundDetails" class="menu-bar">
            <span class="menu-text">资金明细</span>
          </NuxtLinkLocale>
        </li>
        <li :class="[isActivedRoute('account-share') && 'actived']">
          <NuxtLinkLocale to="/account/share" class="menu-bar">
            <span class="menu-text">我的推广</span>
          </NuxtLinkLocale>
        </li>
        <li :class="[isActivedRoute('account-power') && 'actived']">
          <NuxtLinkLocale to="/account/power" class="menu-bar">
            <span class="menu-text">我的算力</span>
          </NuxtLinkLocale>
        </li>
      </ul>
    </div>
    <div class="menu-item">
      <div class="flex-x-start menu-title">
        <span class="icon"
          ><img src="~/assets/images/account_2.png" style="width: 21px"
        /></span>
        <span class="blod">资金管理</span>
      </div>
      <ul class="sub-menus">
        <li :class="[isActivedRoute('account-currencyIn') && 'actived']">
          <NuxtLinkLocale to="/account/currencyIn" class="menu-bar">
            <span class="menu-text">法币存款</span>
          </NuxtLinkLocale>
        </li>
        <li :class="[isActivedRoute('account-currencyOut') && 'actived']">
          <NuxtLinkLocale to="/account/currencyOut" class="menu-bar">
            <span class="menu-text">法币取款</span>
          </NuxtLinkLocale>
        </li>
        <li :class="[isActivedRoute('account-recharge') && 'actived']">
          <NuxtLinkLocale to="/account/recharge" class="menu-bar">
            <span class="menu-text">充币</span>
          </NuxtLinkLocale>
        </li>
        <li :class="[isActivedRoute('account-withdraw') && 'actived']">
          <NuxtLinkLocale to="/account/withdraw" class="menu-bar">
            <span class="menu-text">提币</span>
          </NuxtLinkLocale>
        </li>
      </ul>
    </div>
    <div class="menu-item">
      <div class="flex-x-start menu-title">
        <span class="icon"
          ><img src="~/assets/images/account_3.png" style="width: 20px"
        /></span>
        <NuxtLinkLocale to="/account/myOrders" class="menu-bar">
          <span class="blod menu-text">我的订单</span>
        </NuxtLinkLocale>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const currentRoute = ref("index");
watch(
  () => route.fullPath,
  () => {
    currentRoute.value = route.name;
  },
  {
    immediate: true,
  }
);
const isActivedRoute = (name) => {
  return name === currentRoute.value;
};

</script>

<style scoped lang="scss">
.account-menus {
  width: 240px;
  padding: 35px 10px 35px 54px;
  background: #f5f5f5;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  .menu-item {
    &:not(:last-child) {
      margin-bottom: 38px;
    }
    .menu-title {
      font-size: 16px;
      .icon {
        width: 34px;
      }
    }
    .sub-menus {
      padding-left: 34px;
      margin: 20px auto;
      li {
        margin: 10px auto;
      }
      .menu-bar {
        display: block;
        padding: 8px 0px;
      }
    }
    .menu-text {
      padding: 6px 0;
      &:hover {
        border-bottom: 1px solid #e6c135;  
      }
    }
  }
  .actived .menu-text {
    border-bottom: 1px solid #e6c135;
  }
}
</style>
