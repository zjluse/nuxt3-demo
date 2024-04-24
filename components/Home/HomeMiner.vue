<template>
  <div class="ui-miner">
    <div class="flex-x-between">
      <div
        :class="[
          'flex-x-start',
          'pointer',
          'miner-type-item',
          projectType == 1 && 'active',
        ]"
        @click="changeMinerType(1)"
      >
        <img class="icon" src="~/assets/images/miner_rental.png" />
        <div class="flex-y-start-start">
          <h4>矿机租赁服务</h4>
          <i>LEASEHOLD</i>
        </div>
      </div>
      <div
        :class="[
          'flex-x-start',
          'pointer',
          'miner-type-item',
          projectType == 0 && 'active',
        ]"
        @click="changeMinerType(0)"
      >
        <img class="icon" src="~/assets/images/miner_trusteeship.png" />
        <div class="flex-y-start-start">
          <h4>矿机托管服务</h4>
          <i>TRUSTEESHIP</i>
        </div>
      </div>
    </div>
    <div class="flex-x-center-start miner-display">
      <div class="miner" v-for="item in project" :key="item.id">
        <div class="date">{{ item.cycle }} {{ item.cycle_unit == 'month' ? '月' : item.cycle_unit == 'year' ? '年' : '' }}</div>
        <div class="machine">
          <img class="picture" src="~/assets/images/machine.png" alt="" />
          <template v-if="projectType == 1">
            <div class="type">租赁服务</div>
            <div class="rate">月回报率{{ item.rate }}%</div>
            <div class="price">租赁费<span class="price-num">{{ item.price }}USD</span> /台
          </div>
          </template>
          <template v-else-if="projectType == 0">
            <div v-if="projectType == 0" class="type">{{ item.device }}</div>
            <div v-if="projectType == 0" class="rate">{{ item.rules && JSON.parse(item.rules)[0]?.desc }}</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { FPList, getFPList } = useFinlsProjectList();

const projectType = ref(1);
const project = computed(() => {
  return FPList.value.filter(i => i.type == projectType.value);
});

const changeMinerType = (type) => {
  projectType.value = type;
};

onMounted(() => {
  nextTick(async () => {
    if (!FPList.value.length) {
      try {
        getFPList();
      } catch (err) {}
    }
  })
})
</script>

<style lang="scss" scoped>
.ui-miner {
  margin-top: -88px;
  margin-bottom: 52px;
  .miner-type-item {
    width: 622px;
    height: 88px;
    background: url("~/assets/images/default-miner-type.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 622px 88px;
    padding-left: 40px;
    font-size: 24px;
    color: #5b2084;
    line-height: 1;
    .icon {
      width: 47px;
      height: 47px;
      margin-right: 36px;
    }
    i {
      font-size: 12px;
      margin-top: 8px;
    }
    &.active {
      background-image: url("~/assets/images/active-miner-type.png");
    }
  }
  .miner-display {
    border-radius: 0 0 16px 16px;
    background: #fff;
    padding: 20px 0;
    .miner {
      margin: 60px 100px;
      width: 420px;
      text-align: center;
      .date {
        font-size: 36px;
        padding-bottom: 18px;
        border-bottom: 1px solid #e6e6e6;
      }
      .machine {
        padding: 36px 0 26px 0;
        .picture {
          width: 268px;
          height: 278px;
          margin-bottom: 30px;
        }
        .type {
          font-size: 16px;
        }
        .rate {
          font-size: 20px;
          font-weight: bold;
          margin-top: 10px;
        }
      }
      .price {
        font-size: 24px;
        font-weight: bold;
        padding-top: 24px;
        margin-top: 24px;
        border-top: 1px solid #e6e6e6;
        .price-num {
          color: #5b2084;
          padding: 0 0.2em 0 1em;
        }
      }
    }
  }
}
</style>
