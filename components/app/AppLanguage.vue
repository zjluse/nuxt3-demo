<template>
  <div class="lang">
    <span>{{ localeTitle }}</span>
    <div class="lang_dropdown">
      <ul>
        <li v-for="item in langList" :key="item.symbol" @click="setStateLocale(item.symbol)">{{ item.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n();
const { useLangList, setStateLocale } = useLanguage();
const langList = useLangList();

// await loadLocaleMessages('zh-CN')
const localeTitle = computed(() => {
  return langList.value.find(lang => lang.symbol === locale.value)?.title || '简体中文'
})
</script>

<style lang="scss" scoped>
.lang {
  position: relative;
  padding: 20px 16px;
  &:hover {
    .lang_dropdown {
      display: block;
    }
  }
  .lang_dropdown {
    display: none;
    position: absolute;
    right: 0;
    top: 50px;
    width: 160px;
    background: rgb(207, 203, 203);
    z-index: 9;
    &:hover {
      display: block;
    }
  }
}
</style>