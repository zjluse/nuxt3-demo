<template>
  <div class="investment-rules">
    <!-- 费用说明 -->
    <div class="rules" v-if="projectType == 0">
      <div class="common-box-title rules-title">费用说明</div>
      <div class="content-box">
        <div class="inner-box">
          <div class="flex-x-start term">
            <div class="blod label">矿机价格</div>
            <div class="blod color desc" style="font-size: 20px">${{ projectInfo.price }}</div>
          </div>
          <div class="flex-x-start-start term">
            <div class="label">托管费</div>
            <div class="flex-1 desc">每日收益20%</div>
          </div>
          <div class="flex-x-start-start term">
            <div class="label">电费</div>
            <div class="flex-1 desc">根据托管数量*功耗按月提取预存</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 交易规则 -->
    <div class="rules" v-if="projectType == 0">
      <div class="common-box-title rules-title">交易规则</div>
      <div class="content-box">
        <div class="inner-box">
          <div class="flex-x-start-start term">
            <div class="blod label">{{ rules[0]?.title }}</div>
            <div class="blod color felx-1 desc">{{ rules[0]?.desc }}</div>
          </div>
          <div class="flex-x-start-start term" v-for="(detail, key) in rules[0]?.detail" :key="key">
            <div class="blod label">{{ detail.title }}</div>
            <div class="flex-1 desc">{{ detail.desc }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="rules" v-if="projectType == 1">
      <div class="common-box-title rules-title">租赁规则</div>
      <div class="content-box">
        <div v-for="(r, key) in rules" :key="key">
          <div :class="['space-line', r.detail && 'blod']">{{  r.title }}</div>
          <div class="inner-box" v-if="r.detail">
            <div class="flex-x-start-start term" v-for="(d, k) in r.detail" :key="k">
              <div class="label">{{ d.title }}</div>
              <div class="flex-1 desc">{{ d.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 产品介绍 -->
    <div class="rules">
      <div class="common-box-title rules-title">产品介绍</div>
      <div class="content-box">
        <div>
          {{  projectInfo.description  }}
        </div>
      </div>
    </div>
    <!-- 免责声明 -->
    <div class="rules">
      <div class="common-box-title rules-title">免责声明</div>
      <div class="content-box" v-if="projectType == 0">
        <div>
          1.用户购买的比特币矿机接入金象矿池，享受金象提供的全面数据托管服务。
        </div>
        <div>
          2.这一服务不仅省时省力，还确保了安全。金象数据中心负责统一的数据挖掘服务，产生的比特币收益则根据算力比例分配给用户。
        </div>
      </div>
      <div class="content-box" v-if="projectType == 1">
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  projectType: {
    type: Number,
    required: true,
  },
  projectInfo: {
    type: Object,
    required: true,
  },
});
const rules = computed(() => {
  return (props.projectInfo.rules && JSON.parse(props.projectInfo.rules)) || [];
});
</script>

<style scoped lang="scss">
.investment-rules {
  .rules {
    margin-top: 60px;
  }
}
.rules-title {
  font-size: 20px;
  margin-bottom: 28px;
}
.content-box {
  border: 1px solid #e7e7e7;
  background: #f7f7f7;
  border-radius: 16px;
  padding: 40px 68px 50px 68px;
  line-height: 2.4em;
  .term {
    line-height: 1.6em;
    .label {
      width: 100px;
    }
    .desc {
      padding-left: 36px;
    }
    .color {
      color: #7b4d9b;
    }
    &:not(:last-child) {
      padding-bottom: 28px;
    }
  }

  .space-line {
    margin: 2em 0;
  }
  .inner-box {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      height: 100%;
      width: 1px;
      left: 100px;
      top: 0;
      background: #e7e7e7;
    }
  }
}
</style>
