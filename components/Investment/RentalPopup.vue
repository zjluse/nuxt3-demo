<template>
  <div class="rental-popup">
    <!-- 头部 -->
    <div class="flex-x-between popup-header">
      <span>金象矿机租赁服务</span>
      <span class="flex-x-center" style="width: 20px" @click="closePopup">
        <i class="pointer close"></i>
      </span>
    </div>
    <!-- 内容 -->
    <div class="popup-container">
      <div class="flex-x-between product-info">
        <div>
          <p>{{ productInfo.rate }}%</p>
          <div>月租金收入</div>
        </div>
        <div>
          <p>{{ productInfo.cycle }}月</p>
          <div>期限</div>
        </div>
        <div>
          <p>{{ productInfo.min_volume }}{{ productInfo.unit }}</p>
          <div>起投数量</div>
        </div>
      </div>
      <div class="flex-x-center popup-num-input">
        <InputNumber
          class="flex-1"
          :pt="{ root: 'count-input' }"
          v-model="popupForm.volume"
          @input="onInputChange"
          placeholder="请输入数量"
          :useGrouping="false"
          :min="productInfo.min_volume"
          :step="1"
        >
        </InputNumber>
        <i class="unit">{{ productInfo.unit }}</i>
        <span class="divider"></span>
        <span class="pointer btn" @click="calcMaxMount">最大</span>
      </div>
      <div class="flex-x-start"><span>可用余额:</span><span class="blod" style="font-size: 18px;">{{ bigNumber.ToFixed_DOWN(investmentBalance, 2) }}USDT</span></div>
      <div class="sub-title">投资信息:</div>
      <div class="fee-details">
        <div class="flex-x-between item">
          <span>到期时间</span>
          <span>{{ expireDate }}</span>
        </div>
        <div class="flex-x-between item">
          <span>预期收益</span>
          <span>{{ expectedIncome }} {{ productInfo.currency }}</span>
        </div>
        <div class="flex-x-between item">
          <span>预期回款</span>
          <span>{{ expectedReturn }} {{ productInfo.currency }}</span>
        </div>
      </div>

      <div class="agreement" style="color: #B397C5;">
        <Checkbox v-model="isAgreement" :binary="true" />
        我已阅读并同意<span style="text-decoration: underline;">矿机代營租赁服务協議</span>及细則和<span style="text-decoration: underline;">矿机销售合同條款</span>及细則
      </div>
    </div>
    <!-- 确定购买 -->
    <div class="flex-x-center confirm-btn">
      <div class="flex-x-center pointer btn" @click="confirmBuy"><span>确认购买</span></div>
    </div>
  </div>
</template>

<script setup>
import { buyFinancialProject } from '~/api/financial';
import { BigNumber } from 'bignumber.js';
import { useDateFormat } from "@vueuse/core";


const dialogRef = inject("dialogRef");
const { $toast } = useNuxtApp();
const { investmentData, getInvestmentData } = useAccount();

const popupForm = ref({});
const productInfo = ref({});
const isAgreement = ref(false);
const investmentBalance = computed(() => {
  let balance = 0
  investmentData.value?.forEach((item) => {
    if (item.type == 1) {
      balance += (item.balance)
    }
  })
  return balance
});
const expireDate = computed(() => {
  if (!productInfo.value.cycle) {
    return ''
  }
  var date = new Date()
  date.setMonth(date.getMonth() + productInfo.value.cycle);
  return useDateFormat(date, 'YYYY/MM/DD').value
});
const expectedIncome = computed(() => {
  if (!popupForm.value.volume) {
    return '--'
  }
  return bigNumber.ToFixed_DOWN(new BigNumber(popupForm.value.volume * productInfo.value.price * productInfo.value.cycle * (productInfo.value.rate / 100)), 4);
});
const expectedReturn = computed(() => {
  if (!popupForm.value.volume) {
    return '--'
  }
  return bigNumber.ToFixed_DOWN(new BigNumber(popupForm.value.volume * productInfo.value.price).plus(popupForm.value.volume * productInfo.value.price * productInfo.value.cycle * (productInfo.value.rate / 100)), 4);
});
const fetchLoading = ref(false);

const closePopup = () => {
  dialogRef.value.close({});
};
const onInputChange = (e) => {
  popupForm.value.volume = e.value
};
const calcMaxMount = () => {
  popupForm.value.volume = parseInt(investmentBalance.value / productInfo.value.price)
};

const confirmBuy = async () => {
  if (!isAgreement.value) {
    return 
  }
  if (!popupForm.value.volume) {
    return
  }
  // if (popupForm.value.volume > parseInt(investmentBalance.value / productInfo.value.price)) {
  //   return 
  // }
  try {
    fetchLoading.value = true;
    await buyFinancialProject({
      ...popupForm.value,
      project_id: productInfo.value.id,
      inv_type: 1,
    });
  } catch (e) {
    if (e.value?.msg) {
      $toast.add({ severity: 'success', summary: '提示', detail: e.value.msg, life: 5000 });
      $toast.add({ severity: 'error', summary: '提示', detail: e.value.msg, life: 10000 });
      $toast.add({ severity: 'secondary', summary: '提示', detail: e.value.msg, life: 15000 });
      $toast.add({ severity: 'info', summary: '提示', detail: e.value.msg, life: 20000 });
      $toast.add({ severity: 'contrast', summary: '提示', detail: e.value.msg, life: 25000 });
      $toast.add({ severity: 'warn', summary: '提示', detail: e.value.msg, life: 30000 });
    }
  } finally {
    fetchLoading.value = false;
    getInvestmentData();
    closePopup();
  }
};

onMounted(() => {
  popupForm.value = dialogRef.value.data.buyForm;
  productInfo.value = dialogRef.value.data.projectInfo;
});
</script>

<style scoped lang="scss">
.rental-popup {
  width: 880px;
  height: 600px;
  color: #fff;
  background: url('~/assets/images/host-popup-bg.png') no-repeat center / 100% 100%;
  .popup-header {
    height: 48px;
    font-size: 20px;
    padding: 0 32px 0 68px;
    .close {
      width: 14px;
      height: 13px;
      background: url('~/assets/images/close.png') no-repeat center / 100% 100%;
    }
  }

  .popup-container {
    color: #f7f7f7;
    padding: 16px 68px 0;
    .product-info {
      text-align: center;
      padding: 24px 44px;
      p {
        font-size: 24px;
        margin-bottom: 16px;
      }
    }

    .popup-num-input {
      margin: 10px 0 16px;
      height: 54px;
      border-radius: 28px;
      padding: 0 24px;
      background: rgba(137, 91, 167, 0.7);
      border: 1px solid #CBBAD8;
      .unit {
        
      }
      .divider {
        width: 1px;
        height: 31px;
        background: #d7c7e2;
        margin: 0 12px;
      }
      .btn {
        padding: 2px 4px;
      }
    }

    .sub-title {
      margin-top: 32px;
      margin-bottom: -10px;
    }
    
    .fee-details {
      margin: 24px auto;
      .item {
        height: 36px;
        padding: 0 36px 0 84px;
        &:nth-child(2n+1) {
          background: rgba(137, 91, 167, 0.7);  
        }
      }
    }

  }

  .confirm-btn {
    margin-top: 28px;
    .btn {
      width: 188px;
      height: 66px;
      text-align: center;
      color: #5B2084;
      font-size: 24px;
      padding-bottom: 8px;
      background: url('~/assets/images/btn-yellow.png') no-repeat center / 100% 100%;
    }
  }
}
</style>

<style lang="scss">
.popup-num-input {
  .count-input {
    .p-inputtext {
      border: none;
      box-shadow: none;
      background: transparent;
      padding: 0 14px;
      color: #E6C135;
      font-size: 28px;
      font-weight: bold;
      &:focus {
        outline: none;
      }
      &::placeholder {
        color: #EAE2EF;
        font-size: 22px;
        font-weight: normal;
      }
    }
  }
}
</style>