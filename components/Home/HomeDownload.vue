<template>
  <div class="ui-download">
    <h4 class="title">開始您的挖礦之旅，一切盡在掌握!</h4>
    <div class="flex-x-end content">
      <div class="flex-y-center">
        <img class="qrcode" src="~/assets/images/download_qrcode.png" />
        <div class="text">随时随地轻松点击即可管理收益</div>
        <div class="flex-x-center" style="z-index: 2">
          <NuxtLinkLocale
            to="https://www.apple.com/app-store"
            target="_blank"
            rel="noopener"
          >
            <div class="link appstore"></div>
          </NuxtLinkLocale>
          <NuxtLinkLocale
            to="https://play.google.com/store/apps"
            target="_blank"
            rel="noopener"
          >
            <div class="link googleplay"></div>
          </NuxtLinkLocale>
          <NuxtLinkLocale
            to="https://play.google.com/store/apps"
            target="_blank"
            rel="noopener"
          >
            <div class="link apk"></div>
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-download {
  margin-top: 211px;
  overflow: visible;
  position: relative;
  .title {
    height: 85px;
    line-height: 85px;
    padding-right: 136px;
    text-align: right;
    font-size: 28px;
    color: #fff;
    background: linear-gradient(to right, transparent, #a284b7, #5b2084);
  }
  .content {
    padding-top: 55px;
    padding-right: 20px;
    min-height: 370px;
    .qrcode {
      width: 168px;
      height: 168px;
    }
    .text {
      font-size: 14px;
      margin-top: 20px;
      margin-bottom: 35px;
    }
    .link {
      width: 190px;
      height: 54px;
      margin: 12px;
      cursor: pointer;
    }
    .appstore {
      background: url("~/assets/images/appstore.png") no-repeat center / cover;
    }
    .googleplay {
      background: url("~/assets/images/googleplay.png") no-repeat center / cover;
    }
    .apk {
      width: 180px;
      background: url("~/assets/images/androidapk.png") no-repeat center / cover;
    }
  }
  &::after {
    content: "";
    position: absolute;
    z-index: 1;
    top: -114px;
    left: 12px;
    width: 664px;
    height: 567px;
    background: url("~/assets/images/app_image.png") no-repeat center / cover;
  }
}
</style>
