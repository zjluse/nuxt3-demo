<template>
  <div class="container-box power-page ">
    <iframe 
      style="width: 100%; height: 100%;" 
      :src="computingPowerUrl" frameborder="0">
    </iframe>
  </div>
  
</template>

<script setup>
const { computingPowerUrl } = useAppConfig();
</script>

<style lang="scss" scoped>
.power-page {
  margin-left: 17px;
  margin-bottom: 30px;
  height: 100vh;
}
.container-box {
  background: #fff;
  border-radius: 16px;
  padding: 28px 32px;
}
</style>