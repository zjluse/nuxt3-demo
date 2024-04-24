/**
 * @description: 请求结果设置
 */
export enum ResultEnum {
  SUCCESS = 200,
  EXPIRED = 4001,
  INVALID = 4004,
  FAIL = 101,
  TYPE = 'success',
}

// export const TransactionType = {
//   1: '充币',
//   2: '提币',
// }

// const transactionTypeArray = (obj: any) => {
//   if (!Object.keys(obj).length) return [];
//   return Object.keys(obj).map(key => {
//     return { value: key, text: obj[key] };
//   });
// }
