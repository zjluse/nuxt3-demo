import type { BuyFinancialProjectRequest } from './types/financial';

// 购买理财项目
export function buyFinancialProject(params: BuyFinancialProjectRequest) {
  return useFetchApi.post('/buyFinancialProject', params);
}

// 获取理财项目列表
export function getFinancialProjectList() {
  return useFetchApi.post('/Public/getFinancialProjectList');
}

// 订单赎回
export function redemptionFinancialOrder(params: { id: string }) {
  return useFetchApi.post('/redemptionFinancialOrder', params);
}

// 获取理财项目订单列表
export function getFinancialOrderList() {
  return useFetchApi.post('/getFinancialOrderList');
}
