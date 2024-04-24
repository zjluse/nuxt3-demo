<template>
  <div class="common-page-bar miner-hosting">
    <div class="main-container">
      <InvestmentMiner
        class="miner"
        :projectType="projectType"
        :projectInfo="projectInfo"
        @OnBuyNow="openPopup"
      />
      <InvestmentRules :projectType="projectType" :projectInfo="projectInfo" />
    </div>
  </div>
</template>

<script setup>
import InvestmentHostPopup from "~/components/Investment/HostPopup.vue";

const { $dialog } = useNuxtApp();
const { FPList, getFPList } = useFinlsProjectList();
const { isLogin, getInvestmentData } = useAccount();

const projectType = ref(0);
const projectInfo = computed(() => {
  return FPList.value.filter((i) => i.type == projectType.value)[0] || {};
});

const openPopup = (buyForm) => {
  $dialog.open(InvestmentHostPopup, {
    props: {
      modal: true,
      showHeader: false,
      closable: false,
      dismissableMask: true, // 可以关闭蒙层
      pt: {
        root: 'jx-common-popup',
        content: 'jx-common-popup-content'
      }
    },
    templates: {
      // container: markRaw(InvestmentHostPopup),
      // footer: markRaw(InvestmentHostPopup)
    },
    data: {
      buyForm,
      projectInfo
    }
  });
};

onMounted(() => {
  nextTick(async () => {
    if (!FPList.value.length) {
      try {
        getFPList();
        isLogin && getInvestmentData();
      } catch (err) {}
    }
  });
});
</script>

<style lang="scss" scoped>
.miner-hosting {
  position: relative;
  padding-bottom: 88px;
  .miner {
    margin-top: 50px;
    margin-bottom: 80px;
  }
}
</style>
