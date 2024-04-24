<template>
  <div class="ui-advantages">
    <div class="title">
      <div>产品优势</div>
      <div class="subtitle">PRODUCT ADVANTAGES</div>
    </div>
    <div class="flex-x-start flex-wrap content">
      <div class="flex-x-start item">
        <div class="icon">
          <img style="width: 47px; height: 43px;" src="~/assets/images/advantage_1.png" />
        </div>
        <div>
          <h4>自由选择</h4>
          <p>灵活选择算力，全程自动委托</p>
        </div>
      </div>
      <div class="flex-x-start item">
        <div class="icon">
          <img style="width: 41px; height: 41px;" src="~/assets/images/advantage_2.png" />
        </div>
        <div>
          <h4>自由选择</h4>
          <p>灵活选择算力，全程自动委托</p>
        </div>
      </div>
      <div class="flex-x-start item">
        <div class="icon">
          <img style="width: 36px; height: 47px;" src="~/assets/images/advantage_3.png" />
        </div>
        <div>
          <h4>参与门槛低</h4>
          <p>超级算力投资平民化</p>
        </div>
      </div>
      <div class="flex-x-start item">
        <div class="icon">
          <img style="width: 47px; height: 40px;" src="~/assets/images/advantage_4.png" />
        </div>
        <div>
          <h4>收益稳健</h4>
          <p>区块链网络和人工智能对超级算力需求决定收益的稳健增长</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-advantages{
  background: #fff;
  border-radius: 16px;
  line-height: 1;
  margin-bottom: 60px;
  .title {
    padding: 15px 0;
    text-align: center;
    font-size: 30px;
    color: #fff;
    border-radius: 16px 16px 0 0;
    background: linear-gradient(45deg, #E6E6E6, #9979B0);
    .subtitle{
      font-size: 12px;
      margin-top: 8px;
    }
  }
  .content {
    padding: 22px 22px 22px 70px;
    .item {
      flex: 0 0 50%;
      margin: 36px 0;
      .icon{
        width: 90px;
      }
      h4 {
        font-size: 18px;
      }
      p {
        font-size: 14px;
        margin-top: 1em;
      }
    }
  }
}
</style>
