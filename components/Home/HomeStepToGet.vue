<template>
  <div class="ui-step-to-get">
    <div class="title">
      <div>获取步骤</div>
      <div class="subtitle">STEPS TO GET</div>
    </div>
    <div class="slogan">简单三步，即刻获取超级算力</div>
    <div class="flex-x-center step">
      <div class="flex-x-center step-item"><div>创建帐户</div></div>
      <div class="line"></div>
      <div class="flex-x-center step-item"><div>获取算力回报</div></div>
      <div class="line"></div>
      <div class="flex-x-center step-item"><div>选择算力计划</div></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-step-to-get {
  width: 1280px;
  height: 394px;
  background: url("~/assets/images/step-to-get.png") no-repeat center / cover;
  text-align: center;
  padding-top: 22px;
  color: #fff;
  .title {
    font-size: 30px;
    .subtitle {
      font-size: 12px;
      margin-top: 8px;
    }
  }
  .slogan {
    font-size: 38px;
    margin: 30px auto 34px;
  }
  .step {
    .step-item {
      width: 155px;
      height: 155px;
      border-radius: 50%;
      border: 1px solid #D3C0E0;
      font-size: 18px;
    }
    .line {
      height: 1px;
      background: #F4F4F4;
      width: 138px;
      margin: 0 12px;
    }
  }
}
</style>
