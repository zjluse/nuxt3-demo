<template>
  <div class="flex-x-start ui-tabs">
    <div
      class="pointer tab-item"
      v-for="(item, index) in tabs"
      :key="index"
      :class="currentType == item.type && 'active-bar'"
      @click="$emit('update:currentType', item.type)"
    >{{ item.name }}</div>
  </div>
</template>

<script setup>
const emit = defineEmits(["update:currentType"]);

const props = defineProps({
  currentType: {
    type: [Number,String],
  },
  tabs: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.ui-tabs {
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-width: none;
  .tab-item {
    width: 190px;
    height: 42px;
    line-height: 42px;
    text-align: center;
    background: #fff;
    border: 1px solid #E1E1E1;
    font-weight: bold;
    border-radius: 6px 6px 0 0;
    flex-shrink: 0;
    
    &.active-bar {
      background: #E1E1E1;
    }
    &:not(:last-child) {
      margin-right: 4px;
    }
  }
}
</style>
