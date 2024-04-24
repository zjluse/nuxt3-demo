<template>
  <div class="digital-withdraw container-box">
    <div class="common-box-title title">提款—数字资产</div>
    <div class="flex-x-between sub-title">
      <span>提现</span>
      <div>
        <span class="pointer btn">提现记录</span>
      </div>
    </div>
    <!-- 内容 -->
    <div class="inner-container">
      <!-- 提现币种 -->
      <div class="form-item">
        <p class="form-label">提现币种</p>
        <ClientOnly>
        <Dropdown v-model="formData.symbol" @change="changeSymbol" :options="walletData" optionLabel="symbol" optionValue="symbol" placeholder="提现币种" class="form-wrapper" />
        </ClientOnly>
      </div>
      <div class="divider"></div>
      <!-- 提现地址 -->
      <div class="form-item">
        <p class="form-label">提现地址</p>
        <InputText type="text" v-model="formData.address" placeholder="请输入提现地址" class="form-wrapper" />
      </div>
      <div class="divider"></div>
      <!-- 转账网络 -->
      <div class="form-item">
        <p class="form-label">转账网络</p>
        <ClientOnly>
        <Dropdown v-model="formData.chain" @change="changeChain" :options="chainList" optionLabel="chain" optionValue="chain" placeholder="转账网络" :disabled="!formData.symbol" class="form-wrapper">
          <template #option="slotProps">
            <div class="flex-1 flex-x-between chainDropOption">
              <div><span>{{ slotProps.option.chain }}</span> (<span>{{ slotProps.option.protocol }}</span>)</div>
              <div>手续费：{{ slotProps.option.fee }} {{ formData.symbol }}</div>
            </div>
          </template>
        </Dropdown>
        </ClientOnly>
      </div>
      <div class="divider"></div>
      <!-- 提现数量 -->
      <div class="form-item">
        <p class="form-label">提现数量</p>
        <div class="form-wrapper" style="position: relative;">
          <InputNumber
            class="append-text"
            :pt="{ root: 'amount-input' }"
            v-model="formData.amount"
            placeholder="提现数量"
            :useGrouping="false"
            :min="1"
            :maxFractionDigits="2"
          >
          </InputNumber>
          <span class="currency">{{ formData.symbol }}</span>
        </div>
        <div class="invalid" v-if="actualAmount < 0 || (chainLimitInfo && formData.amount && formData.amount < chainLimitInfo.min_amount)">提现数量不能小于{{ chainLimitInfo.min_amount }}</div>
        <div class="invalid" v-if="canUseBalance && chainLimitInfo && (formData.amount > Math.min(chainLimitInfo.max_amount, canUseBalance))">
          提现数量不能大于{{ Math.min(chainLimitInfo.max_amount, canUseBalance) }}
        </div>
        <!-- 余额 -->
        <div class="form-wrapper" style="font-size: 12px;">
          <div class="flex-x-between" style="margin: 16px 0 16px 30px" v-if="formData.symbol == 'USDT' || formData.symbol == 'USDC'">
            <div>金融账户&nbsp; <span class="blod">{{ availableBalance }}</span></div>
            <span>划转？</span>
          </div>
          <div class="flex-x-between" style="margin: 16px 0 16px 30px">
            <div>实际到账&nbsp; <span class="blod">{{ actualAmount > 0 ? actualAmount : '--' }}</span></div>
            <span>备注？</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="flex-x-center">
      <div class="flex-x-center pointer confirm-btn" @click="confirmHandle">
        <span>下一步</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BigNumber } from 'bignumber.js';
import { getWithdrawParams, withdrawDC } from '~/api/trade';

const { userBaseInfo, walletData, getWalletData, availableBalance, getInvestmentData } = useAccount();

const formData = reactive({
  symbol: null, //币种
  address: '', //地址
  chain: '', //网络
  amount: null, //数量
});
const protocol = ref(null); // ?
const chainList = ref([]);
const canUseBalance = computed(() => {
  if (formData.symbol && walletData.value) {
    return walletData.value.find(i => i.symbol == formData.symbol)?.balance;
  }
  return 0;
});
const chainLimitInfo = computed(() => {
  return chainList.value.find(i => i.chain === formData.chain);
});
const actualAmount = computed(() => {
  if (formData.symbol && formData.amount && chainLimitInfo.value) {
    let amount = new BigNumber(formData.amount).minus(chainLimitInfo.value.fee);
    return amount > 0 ? amount : '--';
  }
  return '--';
});

const changeSymbol = ({ value }) => {
  formData.address = '';
  formData.chain = '';
  getWithdrawCoinConfig();
};
const getWithdrawCoinConfig = async () => {
  const { list } = await getWithdrawParams({symbol: formData.symbol});
  chainList.value = list;
};
const changeChain = ({ value }) => {
  protocol.value = chainList.value.find(i => i.chain == value)?.protocol;
};

const confirmHandle = async () => {
  // 校验
  if (!formData.symbol || !formData.address || !formData.chain || !formData.amount) {
    return ;
  }
  if (formData.chain == 'BTC') {
    if (formData.address.length < 34) {
      return ;
    }
  }
  if (actualAmount < 0 || formData.amount < chainLimitInfo.min_amount) {
    return ;
  }
  if (formData.amount > Math.min(chainLimitInfo.max_amount, canUseBalance.value)) {
    return ;
  }
  if (true || userBaseInfo.value.passwordTransaction == 1) {
    // ???
    await withdrawDC(formData);
    getWalletData();
    getInvestmentData();
    formData.amount = null;
  } else {
    // 设置交易密码 ?
  }
};

onMounted(() => {
  nextTick(() =>{
    getWalletData();
    getInvestmentData();
  });
});
</script>

<style scoped lang="scss">
.digital-withdraw {
  margin-left: 17px;
  margin-bottom: 40px;
  .title {
    font-size: 20px;
    margin-bottom: 26px;
  }
  .sub-title {
    padding-left: 12px;
    font-size: 16px;
    margin-top: 40px;
    margin-bottom: 24px;
    .btn {
      display: inline-block;
      margin-left: 9px;
      width: 146px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      border: 1px solid #E1E1E1;
      border-radius: 14px;
    }
  }
}
.container-box {
  background: #fff;
  border-radius: 16px;
  padding: 28px 32px;
}
.inner-container {
  background: #F7F7F7;
  border-radius: 8px;
  border: 1px solid #E1E1E1;
  padding: 30px 42px;
  .form-item {
    .form-label {
      margin-bottom: 12px; 
    }

    .append-text {
      width: 100%;
    }
    .currency {
      position: absolute;
      z-index: 2;
      right: 1px;
      top: 50%;
      padding: 0 16px;
      background: #fff;
      transform: translateY(-50%);
    }
    .invalid {
      font-size: 12px;
      color: #f56c6c;
      margin: 4px 8px;
    }

  }
}
.form-wrapper {
  width: 504px;
}

.divider {
  border-top: 1px solid #E1E1E1;
  margin: 28px 0;
  height: 1px;
}
.confirm-btn {
  width: 170px;
  height: 48px;
  font-size: 24px;
  color: #fff;
  border-radius: 24px;
  margin-top: 28px;
  background: linear-gradient(to right, #e3e2e4, #7d509d);
}

// 
.chainDropOption {

}
</style>
<style lang="scss">
.digital-withdraw {
  .amount-input {
    .p-inputtext {
      // border: none;
      // box-shadow: none;
      // background: transparent;
      // padding: 0;
      &:focus {
        // outline: none;
      }
    }
  }
}
</style>