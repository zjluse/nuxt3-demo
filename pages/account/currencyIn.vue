<template>
  <div class="currency-in container-box">
    <div class="common-box-title title">存款—金融账户</div>
    <!-- 渠道 -->
    <div class="channel">
      <div class="sub-title">充币</div>
      <ul class="flex-x-start flex-wrap">
        <li class="flex-x-center pointer channel-item" :class="formData.modelid === item.id && 'choised'" v-for="item in cashChannel" :key="item.id" @click="choiseChannel(item.id)">
          <img style="width: 78px; height: 78px;" :src="item.cashChannelBean.logo" alt="" />
        </li>
      </ul>
    </div>
    <!-- 表单 -->
    <div class="action">
      <div class="sub-title">银联存款</div>
      <div class="flex-x-center form">
        <div>
          <span class="form-label">金额</span>
          <div class="flex-x-start form-item">
            <div class="flex-x-center form-input">
              <InputNumber
                class="flex-1 input"
                :pt="{ root: 'amount-input' }"
                v-model="formData.amount"
                :useGrouping="false"
                :min="1"
                :maxFractionDigits="2"
              >
              </InputNumber>
              <span class="currency">USD</span>
            </div>
            <div class="flex-x-center pointer confirm-btn" @click="confirmHandle">
              <span>确认充值</span>
            </div>
          </div>
          <div class="flex-x-start">
            <span class="pointer step-item" v-for="item in stepItems" :key="item" @click="() => formData.amount = item">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCashChannelModelList, depositCash } from '~/api/trade';

const formData = reactive({
  amount: null,
  modelid: '',
  inv_type: 1,
  type: 3,
})
const stepItems = ref([500, 1000, 2000, 3000, 5000]);

const cashChannel = ref([]);
const getCashChannelModel = async () => {
  const { list } = await getCashChannelModelList({type: 1});
  cashChannel.value = list;
};
const choiseChannel = (id) => {
  formData.modelid = id;
};

const confirmHandle = async () => {
  if (!formData.modelid) {
    return
  }
  const limit = cashChannel.value.find(i => i.id == formData.modelid)
  if (formData.amount < limit.min_amount || formData.amount > limit.max_amount) {
    // return 
  }
  try {
    const res = await depositCash(formData);
    if (res.pay_url) {
      window.location.href = res.pay_url
    } else {
      // this.$router.replace('/currency-Voucher/' + res.tranid + '/' + res.pay_amount)
    }
  } catch (e) {}
};

onMounted(() => {
  nextTick(() => {
    getCashChannelModel();
  });
});
</script>

<style scoped lang="scss">
.currency-in {
  margin-left: 17px;
  .title {
    font-size: 20px;
    margin-bottom: 26px;
  }
  .sub-title {
    padding-left: 12px;
    font-size: 16px;
    margin-bottom: 14px;
  }
}
.container-box {
  background: #fff;
  border-radius: 16px;
  padding: 28px 32px;
}

.channel {
  margin-top: 38px;
  margin-bottom: 22px;
  .channel-item {
    width: 289px;
    height: 176px;
    border-radius: 16px;
    margin: 0 24px 24px 0;
    background: #f4f4f4;
    box-shadow: 0px 3px 10px 0px #efefef;
    &.choised {
      border: 1px solid #e6c135;
    }
  }
}
.form {
  border-radius: 8px;
  padding: 52px 0 80px;
  background: #f7f7f7;
  .form-label {
    font-size: 16px;
  }
  .form-item {
    margin: 14px 0;
  }
  .form-input {
    background: #fff;
    border: 1px solid #e1e1e1;
    border-radius: 6px;
    width: 504px;
    height: 46px;
    padding: 0 16px;
    .input {
      font-size: 18px;
    }
    .currency {
      margin-left: 16px;
      font-size: 20px;
      font-weight: bold;
    }
  }
  .confirm-btn {
    width: 170px;
    height: 48px;
    font-size: 24px;
    color: #fff;
    margin-left: 30px;
    border-radius: 24px;
    background: linear-gradient(to right, #e3e2e4, #7d509d);
  }
  .step-item {
    width: 92px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    color: #fff;
    border-radius: 6px;
    margin-right: 11px;
    font-size: 22px;
    &:nth-child(1) {
      background-color: #F4ECD0;
    }
    &:nth-child(2) {
      background-color: #F0E1A9;
    }
    &:nth-child(3) {
      background-color: #EDD783;
    }
    &:nth-child(4) {
      background-color: #E9CC5C;
    }
    &:nth-child(5) {
      background-color: #E6C135;
    }
  }
}
</style>
<style lang="scss">
.currency-in {
  .amount-input {
    .p-inputtext {
      border: none;
      box-shadow: none;
      background: transparent;
      padding: 0;
      &:focus {
        outline: none;
      }
    }
  }
}
</style>
