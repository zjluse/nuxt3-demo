import { getLanguageList } from '~/api/common';

export default () => {
  const { setLocale } = useI18n();

  const setStateLocale = (lang: string) => {
    // 判断语言是否存在?
    setLocale(lang);
  };

  const useLangList = () => {
    return useState('languages', () => {
      return [
        {
          "id": 1,
          "title": "简体中文",
          "symbol": "zh-CN"
        },
        {
          "id": 2,
          "title": "English",
          "symbol": "en"
        },
      ]
    });
  }

  const getLangList = async () => {
    try {
      const response = await getLanguageList({ pageNum: '1', pageSize: '30' });
      useLangList().value = response.list;
    } catch (err) {}
  }

  return {
    useLangList,
    getLangList,
    setStateLocale,
  }
}