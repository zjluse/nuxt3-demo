<template>
  <div class="home-container">
    <div class="main-image">
      <div class="invest">
        <h1>INVEST</h1>
        <h2>IN THE FUTURE</h2>
        <h3>Digital is the future</h3>
      </div>
    </div>
    <div class="main-container">
      <HomeMiner />
      <HomeAdvantages />
      <HomeStepToGet />
      <HomeIntroduce />
      <HomeDownload />
      <HomeHelp />
      <HomePartners />
    </div>
  </div>
</template>

<script setup>
// import { login } from '~/api/common';
// const userStore = useUserStote();
// const counter = useState('counter', () => Math.round(Math.random() * 1000));

// onBeforeMount(async () => {
//   try {
//     const res = await login({
//       username: 'admin',
//       password: 'aa11111111',
//     })
//   } catch (e) {}
// })
</script>

<style lang="scss" scoped>
.home-container {
  min-width: 1280px;
  position: relative;
  background: #ebebeb;
  padding-bottom: 90px;
  .main-image {
    background: url("~/assets/images/main-image.png") no-repeat center / 2560px
      530px;
    width: 100%;
    height: 530px;
    .invest {
      width: 1280px;
      margin: 0 auto;
      padding-top: 100px;
      color: #fff;
      h1 {
        font-size: 52px;
        font-weight: 800;
      }
      h2 {
        font-size: 44px;
        font-weight: normal;
      }
      h3 {
        font-size: 32px;
        font-weight: normal;
      }
    }
  }
}
</style>
