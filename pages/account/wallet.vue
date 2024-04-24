<template>
  <div class="digital-wallet">
    <div class="container-box assets-total">
      <div class="common-box-title title">数字货币</div>
      <div class="flex-x-start assets-cards">
        <div class="common-image-card flex-x-center card purple-card">
          <img class="icon" src="~/assets/images/strongbox.png" alt="" />
          <div class="flex-1 assets-value">
            <p class="value">
              {{ digital_totalAssets }}
              <span class="equivalence"
                >≈ {{ frenchCurrency.title }}
                {{
                  bigNumber.Formate(
                    digital_totalAssets * frenchCurrency.rate,
                    2
                  )
                }}</span
              >
            </p>
            <span class="text">总资产估值(USDT)</span>
          </div>
        </div>
        <div class="flex-y-center btns">
          <div class="pointer btn" @click="goto('/account/recharge')">充币</div>
          <div class="pointer btn" @click="goto('/account/withdraw')">提币</div>
        </div>
      </div>
    </div>

    <div class="container-box assets-list" v-if="computedAssets">
      <UITabs :tabs="coinType" v-model:currentType="currentType" />
      <div class="flex-x-center coin-assets">
        <div class="flex-y-center coin">
          <img
            style="width: 60px; margin-bottom: 10px"
            :src="getImagUrl()"
            alt=""
          />
          <span>{{ currentType }}</span>
        </div>
        <div class="flex-1 data-table">
          <div class="flex-x-center theader">
            <div class="th">总资产</div>
            <div class="th">可用</div>
            <div class="th">冻结</div>
            <div class="th">债权</div>
          </div>
          <div class="flex-x-center tr assets">
            <div class="td">
              {{
                new BigNumber(computedAssets.balance)
                  .plus(computedAssets.frozen)
                  .toFixed(5, BigNumber.ROUND_DOWN)
              }}
            </div>
            <div class="td">
              {{
                new BigNumber(computedAssets.balance).toFixed(
                  5,
                  BigNumber.ROUND_DOWN
                )
              }}
            </div>
            <div class="td">
              {{
                new BigNumber(computedAssets.frozen).toFixed(
                  5,
                  BigNumber.ROUND_DOWN
                )
              }}
            </div>
            <div class="td">{{ 0 }}</div>
          </div>
          <div class="flex-x-center tr">
            <div class="td">
              {{
                "≈" +
                frenchCurrency.title +
                new BigNumber(computedAssets.balance)
                  .plus(computedAssets.frozen)
                  .times(exchangeRate[computedAssets.symbol]?.rate || 1)
                  .toFormat(2, BigNumber.ROUND_DOWN)
              }}
            </div>
            <div class="td">
              {{
                "≈" +
                frenchCurrency.title +
                new BigNumber(computedAssets.balance)
                  .times(exchangeRate[computedAssets.symbol]?.rate || 1)
                  .toFormat(2, BigNumber.ROUND_DOWN)
              }}
            </div>
            <div class="td">
              {{
                "≈" +
                frenchCurrency.title +
                new BigNumber(computedAssets.frozen)
                  .times(exchangeRate[computedAssets.symbol]?.rate || 1)
                  .toFormat(2, BigNumber.ROUND_DOWN)
              }}
            </div>
            <div class="td">{{ 0 }}</div>
          </div>
        </div>
      </div>
      <!-- 详情 -->
      <div class="coin-transaction-record">
        <p class="sub-title">详情</p>
        <ul class="record-list">
          <li class="flex-x-between-start record-item" v-for="item in walletRecordList" :key="item.id">
            <div>
              <p>{{ typeText(item) }}</p>
              <span class="time">{{ item.insert_datetime }}</span>
            </div>
            <div>{{ item.path == 2 ? '-' : '+' }}{{ item.amount }} {{ item.symbol }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BigNumber } from "bignumber.js";
import { useDateFormat } from "@vueuse/core";
import { getWalletRecordList } from '~/api/user';

const { t } = useI18n();
const currencyStore = useCurrencyStore();
const { walletData, digital_totalAssets } = useAccount();
const { frenchCurrency, exchangeRate } = storeToRefs(currencyStore);

const localePath = useLocalePath();
const goto = (path) => {
  navigateTo(localePath(path));
};

const currentType = ref("USDT");
const coinType = computed(() => {
  return walletData.value.map((i) => {
    return { type: i.symbol, name: i.symbol };
  });
});
const computedAssets = computed(() => {
  if (walletData.value.length > 0) {
    let obj = walletData.value.find((i) => i.symbol === currentType.value);
    if (obj) {
      return obj;
    } else {
      currentType.value = walletData.value[0].symbol;
    }
  }
});

const getImagUrl = () => {
  return new URL(
    `/assets/images/coins/${currentType.value}.png`,
    import.meta.url
  );
};

// 详情

const walletRecordList = ref([]);
const getWalletRecordData = async () => {
  // startDate: useDateFormat(new Date(), 'YYYY-MM-DD')
  const response = await getWalletRecordList({ symbol: currentType.value })
  walletRecordList.value = response.list;
}
watchEffect(() => {
  if (computedAssets.value?.symbol) {
    getWalletRecordData()
  }
});
const typeText = (item) => {
  if (item.type == 7) {
    if (item.path == 1) {
      return '充币' || t('assets.btn1')
    }
    if (item.path == 2) {
      return '提币' || t('assets.btn2')
    }
  }
  if (item.type == 1 || item.type == 2 || item.type == 3 || item.type == 4) {
    return '划转' ||  t('assets.btn3')
  }
  if (item.type == 5) {
    return '法币提款' || t('assets.btn5')
  }
  if (item.type == 6) {
    return '闪兑' || t('assets.btn6')
  }
  if (item.type == 10) {
    return '矿池收益'
  }
}

</script>

<style scoped lang="scss">
.digital-wallet {
  margin-left: 17px;
  .title {
    font-size: 20px;
    margin-bottom: 26px;
  }
  .assets-total {
    margin-bottom: 20px;
  }
  .assets-list {
    margin-bottom: 30px;
  }
}
.container-box {
  background: #fff;
  border-radius: 16px;
  padding: 28px 32px;
}
.assets-cards {
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
      margin-bottom: 20px;
      .equivalence {
        font-size: 18px;
      }
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

.coin-assets {
  margin-top: -1px;
  border: 1px solid #e1e1e1;
  .coin {
    align-self: normal;
    // padding: 0 60px;
    width: 188px;
    background: #f7f7f7;
    font-size: 16px;
    font-weight: bold;
  }
}
.data-table {
  text-align: center;
  border-left: 1px solid #e1e1e1;
  .theader {
    font-size: 12px;
    background: #f7f7f7;
  }
  .tr {
    border-top: 1px solid #e1e1e1;
    &.assets {
      font-size: 16px;
    }
  }
  .theader,
  .tr {
    height: 64px;
    line-height: 64px;
    .th,
    .td {
      // &:nth-child(1) {
      width: 25%;
      // }
    }
  }
}

.coin-transaction-record {
  .sub-title {
    font-size: 16px;
    margin-left: 12px;
    margin-top: 40px;
    margin-bottom: 20px;
  }
  .record-list {
    max-height: 500px;
    overflow: auto;
  }
  .record-item {
    padding: 20px 12px;
    border-bottom: 1px solid #E1E1E1;
    &:nth-child(1) {
      border-top: 1px solid #000;
    }
    .time {
      font-size: 12px;
      display: inline-block;
      margin-top: 14px;
    }
  }
}
</style>
