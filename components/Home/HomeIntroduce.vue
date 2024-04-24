<template>
  <div class="flex-x-between-start ui-introduce">
    <div class="left-title">
      <div class="label_1">THE WORLD'S LEADING</div>
      <p class="label_2">COMPUTING POWER</p>
      <p class="label_2">SERVICE PROVIDER</p>
      <div class="label_3">全球领先 <br>算力服務商</div>
    </div>
    <div class="right-content">
      <ul>
        <li>
          <p>一站式服务体系</p>
          <div>我们比客户更懂客户的需求，提供超级算力相关的全方位系统服务支持，不断创新业务类型和突破业务边界</div>
        </li>
        <li>
          <p>丰富的全球经验</p>
          <div>我们的足迹遍布北美、欧洲、中亚和东南亚，多年来通过不断完善超级算力的业务积累了丰富的全球经验</div>
        </li>
        <li>
          <p>顶尖的技术团队</p>
          <div>创始团队成员具备多年金融行业经验。技术及安全团队负责人均为该领域顶尖人士，行业经验均超过10年</div>
        </li>
        <li>
          <p>优质的基础设施</p>
          <div>深耕美国，拥有行业最稀缺的基础设施资源、稳定合规的电力资源、优质的硬件设备建设及管理资源</div>
        </li>
        <li>
          <p>兼顾创新与环保</p>
          <div>积极探索提高效率的新途径，兼顾环境和提高无碳能源比例，充分利用天然气、太阳能等可再生能源</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-introduce {
  background-color: #fff;
  border-radius: 16px;
  background-image: url('~/assets/images/globe.png');
  background-repeat: no-repeat;
  background-position: left bottom;
  background-size: 640px 653px;
  padding: 105px 66px;
  margin-top: 57px;
  .label_1 {
    font-size: 20px;
    color: #5B2084;
    font-weight: bold;
  }
  .label_2 {
    font-size: 36px;
    color: #5B2084;
    font-weight: bold;
  }
  .label_3 {
    margin-top: 33px;
    font-size: 38px;
    line-height: 1.4;
  }
  .right-content {
    padding-left: 107px;
    font-size: 14px;
    li:not(:last-child) {
      margin-bottom: 66px;
    }
    p {
      font-size: 18px;
      margin-bottom: 1em;
      font-weight: bold;
    }
  }
}
</style>
