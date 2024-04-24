<template>
  <div class="assets-detail">
    <div class="container-box assets-total">
      <div class="common-box-title title">资产</div>
      <div class="flex-x-between assets-cards">
        <div class="common-image-card flex-x-center card yellow-card">
          <img class="icon" src="~/assets/images/gold_coins.png" alt="" />
          <div class="flex-1 assets-value">
            <p class="value">{{ bigNumber.Formate(earnings, 2) }}</p>
            <div class="line"></div>
            <span class="text">累计收益</span>
          </div>
        </div>
        <div class="common-image-card flex-x-center card purple-card">
          <img class="icon" src="~/assets/images/strongbox.png" alt="" />
          <div class="flex-1 assets-value">
            <p class="value">
              {{ totalAssets }}
              <span class="equivalence">≈ {{ frenchCurrency.title }} {{ computedValuation  }}</span>
            </p>
            <div class="line"></div>
            <span class="text">总资产估值(USDT)</span>
          </div>
        </div>
        <div class="flex-y-center btns">
          <div class="pointer btn" @click="goto('/account/currencyIn')">存款</div>
          <div class="pointer btn" @click="goto('/account/currencyOut')">取款</div>
        </div>
      </div>
      <DataTable
        :value="assetBalance"
        showGridlines
        size="large"
        tableStyle="margin-top: 38px"
        tableClass="my-app-table"
        :pt="{
          thead: 'common-table-thead',
          headerRow: 'common-table-headercell',
        }"
      >
        <Column field="prepaidAccount" header="预付金融账户">
          <template #body="slotProps">
            {{ prepaidAccount }}
          </template>
        </Column>
        <Column field="availableBalance" header="可用余额(USDT)">
          <template #body="slotProps">
            {{ availableBalance }}
          </template>
        </Column>
        <Column field="frozenBalance" header="冻结金额(USDT)">
          <template #body="slotProps">
            {{ frozenBalance }} ≈ {{ frozenBalance }}
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="container-box assets-list">
      <div class="common-box-title title">资产列表</div>
      <AccountOrderTabel />
    </div>
  </div>
</template>

<script setup>
import { BigNumber } from "bignumber.js";

const { frenchCurrency } = useCurrencyStore();
const { earnings, totalAssets, availableBalance, prepaidAccount, frozenBalance } = useAccount();

const localePath = useLocalePath();
const goto = (path) => {
  navigateTo(localePath(path));
}

const assetBalance = ref([{ prepaidAccount: 0, availableBalance: 0, frozenBalance: 0 }]);

const computedValuation = computed(() => {
  let assets = new BigNumber(totalAssets.value);
  const total = assets.times(frenchCurrency.rate);
  return bigNumber.ToFixed_DOWN(total, 2, true);
});

onMounted(() => {
  nextTick(() => {});
});
</script>

<style scoped lang="scss">
.assets-detail {
  margin-left: 17px;
  margin-bottom: 30px;
  .title {
    font-size: 20px;
    margin-bottom: 26px;
  }
  .assets-total {
    margin-bottom: 20px;
  }
  .assets-list {
  }
}
.container-box {
  background: #fff;
  border-radius: 16px;
  padding: 28px 32px;
}
.assets-cards {
  .yellow-card {
    background-image: url("~/assets/images/yellow-card.png");
  }
  .purple-card {
    background-image: url("~/assets/images/purple-card.png");
  }
  .card {
    padding: 0 27px 0 12px;
    line-height: 1;
    .icon {
      width: 90px;
      // margin-right: 10px;
    }
    .value {
      font-size: 38px;
      .equivalence {
        font-size: 18px;
      }
    }
    .line {
      border-top: 1px solid #000000;
      margin: 10px auto;
    }
    .text {
      font-size: 16px;
    }
  }
  .btns {
    margin: 0 16px;
    .btn {
      width: 170px;
      height: 48px;
      line-height: 48px;
      font-size: 18px;
      border: 1px solid #b6b6b6;
      border-radius: 24px;
      text-align: center;
      margin: 16px 0;
    }
  }
}
</style>
