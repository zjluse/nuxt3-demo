<template>
  <footer class="footer">
    <div class="flex-x-between-start container">
      <div class="left">
        <NuxtLinkLocale class="logo" to="/">
          <img src="~/assets/images/logo_white.png" />
        </NuxtLinkLocale>
        <div>全球領先的算力服務提供商</div>
        <div>© Bitcoin Project 2009-2024 Golden Elephant</div>
      </div>
      <div class="flex-1 flex-x-end-start right">
        <div>
          <p>商品</p>
          <div>
            <NuxtLinkLocale to="/">矿机销售</NuxtLinkLocale>
          </div>
          <div>
            <NuxtLinkLocale to="/">矿机托管</NuxtLinkLocale>
          </div>
        </div>
        <div>
          <p>公司</p>
          <div>
            <NuxtLinkLocale to="/">关于我们</NuxtLinkLocale>
          </div>
          <div>
            <NuxtLinkLocale to="/">商家内容</NuxtLinkLocale>
          </div>
        </div>
        <div>
          <p>支持</p>
          <div>
            <NuxtLinkLocale to="/">帮助中心</NuxtLinkLocale>
          </div>
          <div>
            <NuxtLinkLocale to="/">隐私协议</NuxtLinkLocale>
          </div>
          <div>
            <NuxtLinkLocale to="/">用户协议</NuxtLinkLocale>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.footer {
  background: #8E8E8E;
  padding: 44px 0;
  .container {
    width: 1280px;
    margin: 0 auto;
    font-size: 14px;
    color: #EBEBEB;
  }
  .left {
    line-height: 1.6;
    .logo img {
      width: 210px;
      height: 45px;
      margin-bottom: 60px;
    }
  }
  .right {
    line-height: 3em;
    > div {
      margin-left: 100px;
    }
    p {
      font-weight: 600;
    }
  }
}
</style>
