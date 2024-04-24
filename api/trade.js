export function getCashChannelModelList(params) {
  return useFetchApi.post('/getCashChannelModelList', params);
}
export function depositCash(params) {
  return useFetchApi.post('/depositCash', params);
}
export function getCollectionAccountList(params) {
  return useFetchApi.post('/getCollectionAccountList', params);
}
export function withdrawCash(params) {
  return useFetchApi.post('/withdrawCash', params);
}
export function getWithdrawParams(params) {
  return useFetchApi.post('/getWithdrawParams', params);
}
export function withdrawDC(params) {
  return useFetchApi.post('/withdrawDC', params);
}
