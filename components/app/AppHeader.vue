<template>
  <div class="app-header">
    <div class="header-bar flex-x-between">
      <div class="flex-x-start flex-1">
        <NuxtLinkLocale class="logo" to="/">
          <img src="~/assets/images/logo.png" />
        </NuxtLinkLocale>
        <ul class="flex-x-center menu-list">
          <li
            :class="[
              currentRoute.includes(item.name) && 'active-bar',
              'menu-item',
            ]"
            v-for="item in appRouterList"
            :key="item.name"
          >
            <NuxtLink :to="localePath(item.path)">{{
              $t(item.label)
            }}</NuxtLink>
          </li>
          <li class="flex-x-center pointer menu-item">
            <span>{{ $t("header.more") }}</span
            ><i class="arrow-down"></i>
          </li>
        </ul>
      </div>

      <div class="flex-x-center tools-list">
        <NuxtLinkLocale
          to="/account"
          :class="[
            'flex-x-center',
            currentRoute.includes('account') && 'active-bar',
            'account',
          ]"
        >
          <i class="icon"></i>
          <span>{{ $t("header.account") }}</span>
        </NuxtLinkLocale>
        <div class="app">APP</div>
        <AppLanguage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// const { t } = useI18n();
const i18n = useI18n();
const route = useRoute();
const localePath = useLocalePath();

const currentRoute = ref<any>("index");
watch(
  () => route.fullPath,
  () => {
    currentRoute.value = route.name;
  },
  {
    immediate: true,
  }
);

const appRouterList = [
  { name: "index", path: "/", label: "header.index" },
  {
    name: "minerHosting",
    path: "/minerHosting",
    label: "header.minerHosting",
  },
  { name: "minerRental", path: "/minerRental", label: "header.minerRental" },
  {
    name: "miningDisplay",
    path: "/miningDisplay",
    label: "header.miningDisplay",
  },
  { name: "information", path: "/information", label: "header.information" },
  { name: "guide", path: "/guide", label: "header.guide" },
];
</script>

<style lang="scss" scoped>
.app-header {
  .header-bar {
    width: 1280px;
    height: 120px;
    margin: 0 auto;
    .logo img {
      width: 199px;
      margin-right: 54px;
    }
    .menu-list {
      font-size: 16px;
      .menu-item {
        margin: 0 10px;
        padding: 10px;
        font-size: 16px;
      }
      .active-bar {
        color: #5b2084;
        font-weight: bold;
      }
      .arrow-down {
        width: 9px;
        height: 5px;
        margin-left: 8px;
        background: url("~/assets/images/arrow-down.png") no-repeat center /
          100%;
      }
    }

    .tools-list {
      color: #a3a3a3;
      font-size: 14px;
      .account {
        padding: 8px 16px;
        .icon {
          width: 19px;
          height: 22px;
          margin-right: 10px;
          background: url("~/assets/images/account.png") no-repeat center / 100%;
        }
        &.active-bar {
          background: #d6d4d4;
          border-radius: 30px;
          color: #000;
        }
      }
      .app {
        margin: 0 14px;
      }
    }
  }
}
</style>
