<template>
  <div class="flex-x-between-start project-info">
    <div class="machine">
      <p class="device blod">{{ projectInfo.device }}</p>
      <div class="flex-x-center">
        <span>{{ projectInfo.hash }}TH/s</span>
        <i class="dot"></i>
        <span>{{ projectInfo.hash }}J/T</span>
        <i class="dot"></i>
        <span>{{ projectInfo.electricity_power * 1000 }}W</span>
      </div>
      <img class="picture" src="~/assets/images/machine_2.png" alt="" />
    </div>
    <div class="flex-1 form-info">
      <h4 class="blod">
        {{ projectType == "1" ? "矿机租赁" : "矿机托管" }} &nbsp;
        {{ projectInfo.device }} &nbsp; {{ projectInfo.hash }}T &nbsp;
        {{ projectInfo.cycle }}{{ projectInfo.cycle_unit?.toLocaleUpperCase() }}
      </h4>
      <div class="detail">
        <div class="item" v-if="projectType == '1'">
          <span>价格: </span><span class="blod">{{ projectInfo.price }}USD/{{ projectInfo.unit }}</span>
        </div>
        <div class="item" v-else>
          <span>价格: </span><span class="blod">{{ projectInfo.price }}U/{{ projectInfo.unit }}</span>
        </div>
        <div class="flex-x-start item">
          <span>台数:&nbsp;</span>
          <InputNumber
            class="input"
            :pt="{ root: 'my-volume-input' }"
            v-model="buyForm.volume"
            showButtons
            :useGrouping="false"
            inputId="horizontal-buttons"
            buttonLayout="horizontal"
            :step="1"
            :min="projectInfo.min_volume"
            :max="projectInfo.max_volume"
            placeholder="请输入"
            :suffix="projectInfo.unit"
          >
            <template #decrementbuttonicon>-</template>
            <template #incrementbuttonicon>+</template>
          </InputNumber>
        </div>
        <div class="flex-x-between item">
          <span v-if="projectType == '1'">月租收入: {{ projectInfo.rate }}%</span>
          <span>最少认购份额: {{ projectInfo.min_volume }}/{{ projectInfo.unit }}</span>
        </div>
        <div class="flex-x-between item">
          <span v-if="projectType == '1'">合同期限: {{ projectInfo.cycle }}月</span>
          <span>最多认购份额: {{ projectInfo.max_volume }}/{{ projectInfo.unit }}</span>
        </div>
      </div>
      <div class="flex-x-start total-price">
        <span>总价格</span><span class="price">{{ totalPrice }}</span>
      </div>
      <div class="pointer buy-btn" @click="buyNow">立即申购</div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["OnBuyNow"]);
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

const buyForm = reactive({
  volume: 1,
  auto_type: 1, //1-自动复利 2-自动延期 3-自动停止
});
const totalPrice = computed(() => {
 return bigNumber.ToFixed_DOWN((buyForm.volume || 0) * (props.projectInfo.price || 0), 2)
});

// 立即申购
const buyNow = () => {
  emit('OnBuyNow', buyForm);
};
</script>

<style lang="scss">

</style>
<style scoped lang="scss">
.project-info {
  .machine {
    width: 600px;
    border-radius: 16px;
    background: #f7f7f7;
    padding: 40px 20px 60px;
    font-size: 18px;
    text-align: center;
    .device {
      font-size: 36px;
      margin-bottom: 40px;
    }
    .dot {
      width: 3px;
      height: 3px;
      background: #000000;
      margin: 0 48px;
    }
    .picture {
      width: 262px;
      margin: 55px auto 0;
    }
  }
  .form-info {
    padding-left: 110px;
    h4 {
      font-size: 24px;
      padding: 16px 0 20px 8px;
      border-bottom: 1px solid #a3a3a3;
    }
    .detail {
      padding: 12px 0 12px 8px;
      border-bottom: 1px solid #a3a3a3;
    }
    .item {
      margin: 32px 0;
    }
    .total-price {
      margin-left: 8px;
      font-weight: bold;
      margin-top: 24px;
      margin-bottom: 36px;
      .price {
        color: #7B4D9B;
        font-size: 36px;
        margin-left: 24px;
      }
    }
    .buy-btn {
      margin-left: 8px;
      font-weight: bold;
      font-size: 24px;
      color: #fff;
      width: 170px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      border-radius: 24px;
      background: linear-gradient(to right, #E3E2E4, #7D509D);
    }
  }
}
</style>
<style lang="scss">
.my-volume-input {
  box-shadow: none;
  .p-inputtext {
    width: 90px;
    text-align: center;
    border-left: 0;
    border-right: 0;
    box-shadow: none;
  }
  .p-inputnumber-button {
    border-radius: 16px;
    background: transparent;
  }
  .p-inputnumber-button-down {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .p-inputnumber-button-up {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
