<template>
  <iframe 
    style="width: 100%; height: 100vh;" 
    :src="computingPowerUrl" frameborder="0">
  </iframe>
</template>

<script setup>
const { computingPowerUrl } = useAppConfig();
</script>
