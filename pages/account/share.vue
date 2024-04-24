<template>
  <div class="share-page">
    <div class="container-box">
      <div class="common-box-title title">我的推广</div>

      <div class="flex-y-center share">
        <h4>邀请好友一起赚钱</h4>
        <img style="width: 140px; margin: 20px auto;" :src="shareQRcode" alt="">
        <p>邀请码：{{ userBaseInfo.code }} <i class="pointer" style="border: 1px solid #e1e1e1;padding: 2px 4px; font-size: 12px; margin-left: 1em;" @click="copy(userBaseInfo.code)">复制</i></p>
        <div style="margin-top: 30px;">邀请链接：<NuxtLink :to="shareUrl" target="blank">{{ shareUrl }}</NuxtLink></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import QRCode from 'qrcode';
import { useClipboard } from '@vueuse/core'

const { copy, isSupported } = useClipboard({})
const { userBaseInfo } = useAccount();

const shareQRcode = ref('');
const shareUrl = ref('https://jd123.com');

const generateQR = async () => {
  try {
    shareQRcode.value = await QRCode.toDataURL(shareUrl.value, {
      margin: 0,
      width: 500,
      height: 500,
      errorCorrectionLevel: 'H'
    });
  } catch (e) {}
};
watchEffect(() => {
  shareUrl.value = `https://jd123.com?qrcode=${userBaseInfo.value.code}`;
  generateQR();
});
</script>

<style scoped lang="scss">
.share-page {
  margin-left: 17px;
  .title {
    font-size: 20px;
    margin-bottom: 26px;
  }
}
.container-box {
  background: #fff;
  border-radius: 16px;
  padding: 28px 32px;
}
</style>