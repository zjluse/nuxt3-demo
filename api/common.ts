import type { PageInfo, GetLanguageList, GetVerifyCode, GetProductList, GetCurrencyList, GetPriceList, Login, Register, RecoverPassword } from './types/common';

// 获取语言列表
export function getLanguageList(params: GetLanguageList) {
  return useFetchApi.post('/Public/getLanguageList', params);
}

// 获取验证码
export function getVerifyCode(params: GetVerifyCode) {
  return useFetchApi.post('/Public/getVerifyCode', params);
}

// 获取服务器时间
export function getSystemDatetime() {
  return useFetchApi.post('/Public/getSystemDatetime');
}

// 获取系统参数
export function getSystemParams() {
  return useFetchApi.post('/Public/getSystemParams');
}

// 获取产品列表
export function getProductList(params: GetProductList) {
  return useFetchApi.post('/Public/getProductList', params, {
    // headers: {
    //   'content-type': 'application/x-www-form-urlencoded',
    // }
  });
}

// 官方验证
export function verifyingOfficial() {
  return useFetchApi.post('/Public/VerifyingOfficial');
}

// 获取货币列表
export function getCurrencyList(params: any) {
  return useFetchApi.post('/Public/getCurrencyList', params);
}

// 获取K线数据
export function getPriceList(params: GetPriceList) {
  return useFetchApi.post('/Public/getPriceList', params);
}

// 获取产品分组列表
export function getProductGroupList(params: PageInfo) {
  return useFetchApi.post('/Public/getProductGroupList', params);
}

// 获取横幅列表
export function getFaBannerList(params: {language: string}) {
  return useFetchApi.post('/Public/getFaBannerList', params);
}

export function login(params: Login) {
  return useFetchApi.post('/Public/login', {
    ...params,
    password: aesCrypto.aesEncrypt(params.password),
  });
}

export function register(params: Register) {
  return useFetchApi.post('/Public/Register', params);
}

export function recoverPassword(params: RecoverPassword) {
  return useFetchApi.post('/Public/recoverPassword', {
    ...params,
    password: aesCrypto.aesEncrypt(params.password),
    re_password: aesCrypto.aesEncrypt(params.re_password),
  });
}
