<template>
  <NuxtLayout>
    <NuxtPage keepalive />
  </NuxtLayout>

  <Toast />
</template>

<script setup>
import { useToast } from 'primevue/usetoast';

useHead({
  title: 'Nuxt 3 PrimeVue Starter'
});
const toast = useToast();
const { $toast } = useNuxtApp()

onMounted(() => {
  // nextTick();
  // toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 0 });
  // $toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 0 })
})
</script>

<style lang="scss">
</style>
