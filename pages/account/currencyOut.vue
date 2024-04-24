<template>
  <div class="currency-out container-box">
    <div class="common-box-title title">提款—金融账户</div>
    <div class="flex-x-between sub-title">
      <span>提款到银行卡</span>
      <div>
        <span class="pointer btn">添加银行卡</span>
        <span class="pointer btn">提现记录</span>
      </div>
    </div>
    <!-- 内容 -->
    <div class="inner-container">
      <!-- 选银行卡 -->
      <div class="form-item bankCard">
        <p class="form-label">选择银行卡</p>
        <ul class="bankList">
          <li v-for="category in payAccountList" :key="category.id" class="flex-x-start">
            <RadioButton v-model="formData.collection_account_id" :inputId="category.id+''" name="bankcard" :value="category.id" />
            <label class="flex-x-center bank-info" :for="category.id"><span class="bank-name">{{ category.value.bankName }}</span><span>尾号：{{ category.value.account.slice(-4) }}</span></label>
          </li>
        </ul>
      </div>
      <div class="divider"></div>
      <!-- 选账户 -->
      <div class="form-item">
        <p class="form-label">提取账户</p>
        <ClientOnly>
        <Dropdown v-model="formData.type" :options="accountType" optionLabel="name" optionValue="code" placeholder="账户类型" class="form-wrapper" />
        </ClientOnly>
      </div>
      <div class="divider"></div>
      <!-- 数量 -->
      <div class="form-item">
        <div class="flex-x-between form-label form-wrapper">
          <p>出售数量</p>
          <div style="font-size: 12px;">可提现金额<span class="blod" style="margin: 0 1em;">{{ bigNumber.ToFixed_DOWN(canUseBalance, 2) }}</span>USDT</div>
        </div>
        <div class="form-wrapper" style="position: relative;">
          <InputNumber
            class="append-text"
            :pt="{ root: 'amount-input' }"
            v-model="formData.amount"
            placeholder="出售数量"
            :useGrouping="false"
            :min="1"
            :maxFractionDigits="2"
          >
          </InputNumber>
          <span class="currency">USD</span>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="flex-x-center">
      <div class="flex-x-center pointer confirm-btn" @click="confirmHandle">
        <span> 确认充值</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCollectionAccountList, withdrawCash } from '~/api/trade';

const { walletData, getWalletData, investmentData, getInvestmentData } = useAccount();

const symbol = "USDT";
const accountType = ref([
  { name: '数字钱包', code: 2 },
  { name: '金融账户', code: 3 },
]);
const formData = reactive({
  collection_account_id: null, //收款方式
  type: null, //提取账户
  amount: null, //金额
  currency: 'USD',
  inv_type: 1,
  password: ''
});

const payAccountList = ref([]);
const getCollectionAccount = async () => {
  const { list } = await getCollectionAccountList();
  list.forEach(item => {
    item.value = item.value ? JSON.parse(item.value) : {}
  })
  payAccountList.value = list;
};

// 可提现金额
const canUseBalance = computed(() => {
  if (formData.type == 2 && walletData.value) {
    return walletData.value.find(i => i.symbol == symbol)?.balance;
  } else if (formData.type == 3 && investmentData.value) {
    return investmentData.value.find(i => i.type == 1)?.balance;
  }
  return 0;
});

const confirmHandle = () => {
  if (!formData.collection_account_id) {
    return 
  }
  if (!formData.type) {
    return 
  }
  if (!formData.amount) {
    return 
  }
  if (formData.amount > canUseBalance) {
    return 
  }
  insertCashOut();
};
const insertCashOut = async () => {
  const additionalParams = formData.type === 2 ? { symbol: symbol } : {};
  try {
    await withdrawCash({ ...formData, ...additionalParams  });
    formData.amount = null;
    getWalletData();
    getInvestmentData();
  } catch(e) {}
};

onMounted(() => {
  nextTick(() => {
    getWalletData();
    getInvestmentData();
    getCollectionAccount();
  });
});
</script>

<style scoped lang="scss">
.currency-out {
  margin-left: 17px;
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
  }
}
.form-wrapper {
  width: 504px;
}

.divider {
  border-top: 1px solid #E1E1E1;
  margin: 24px 0;
  height: 1px;
}


.bankCard {
  .bankList {
    margin: 24px 0;
    > li {
      // font-size: 16px;
      margin: 18px 0;
    }
    .bank-info {
      margin-left: 12px;
      .bank-name {
        width: 200px;
        margin-right: 12px;
      }
    }
  }
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

</style>
<style lang="scss">
.currency-out {
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