<template>
  <NuxtLayout>
    <NuxtPage :keepalive="{max: 10}" />
  </NuxtLayout>

  <Toast />
  <DynamicDialog />
</template>

<script setup>
import AppFooter from "~/components/App/AppFooter.vue";

// useHead({
//   title: "Jinxmine",
// });

const { $on } = useEmitter();
const { getProductData } = useAppGlobalStore();
const { getLangList } = useLanguage();

const { $toast, $dialog } = useNuxtApp();

onMounted(() => {
  $on("OPEN-LOGIN-MODAL", (path) => {
    $dialog.open(AppFooter, {
      props: {
        header: "登录 / 注册",
        style: {
          width: "50vw",
        },
        breakpoints: {
          "960px": "75vw",
          "640px": "90vw",
        },
        modal: true,
      },
      onCancel: (e) => {
        console.log(e);
      },
    });
  });
  nextTick(() => {
    getLangList();
    getProductData();
  });
});

onBeforeMount(() => {});
</script>

<style lang="scss"></style>
