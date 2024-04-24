<template>
  <div class="ui-help">
    <div class="title">
      <div>需要帮助</div>
      <div class="subtitle">NEED HELP</div>
    </div>
    <div class="flex-x-center-start content">
      <div class="flex-y-center item">
        <div class="icon chat">
        </div>
        <p>24/7聊天支持</p>
        <div>全天候的在線聊天支持</div>
        <div>我們的客服代表將竭誠為您服務</div>
      </div>
      <div class="flex-y-center item border">
        <div class="icon question">
        </div>
        <p>常见问题</p>
        <div>根据关键词查询相关问题</div>
        <div>获取特定功能的详细说明</div>
      </div>
      <div class="flex-y-center item">
        <div class="icon twitter">
        </div>
        <p>Twitter</p>
        <div>關注金象的推特賬號</div>
        <div>實時關注我們發佈的最新動態與評論</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-help {
  margin-top: 120px;
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
    padding: 28px 50px 60px;
    background: #fff;
    border-radius: 0 0 16px 16px;
    .item {
      padding: 24px 0 30px 0;
      flex: 0 0 33%;
      text-align: center;
      font-size: 18px;
      line-height: 1.4;
      p {
       font-size: 22px;
       margin-top: 20px;
       margin-bottom: 30px; 
      }
    }
    .border {
      border-left: 1px solid #E6E6E6;
      border-right: 1px solid #e6e6e6;
    }
    .icon {
      width: 40px;
      height: 40px;
      &.chat {
        background: url("~/assets/images/chat.png") no-repeat center / 36px 41px;
      }
      &.question {
        background: url("~/assets/images/question.png") no-repeat center / 34px 36px;
      }
      &.twitter {
        background: url("~/assets/images/twitter.png") no-repeat center / 34px 34px;
      }
    }
  }
}
</style>
