import { BigNumber } from "bignumber.js";

// const fmt = {
//   prefix: '',
//   decimalSeparator: '.',
//   groupSeparator: ',',
//   groupSize: 3,
//   secondaryGroupSize: 0,
//   fractionGroupSeparator: ' ',
//   fractionGroupSize: 0,
//   suffix: ''
// }
// BigNumber.config({ FORMAT: fmt })

export default {
  // ROUND_DOWN: (data, dp) => {
  //   return new BigNumber(data).decimalPlaces(dp, Decimal.ROUND_DOWN);
  // },
  // ROUND_UP: (data, dp) => {
  //   return new BigNumber(data).decimalPlaces(dp, Decimal.ROUND_UP);
  // },
  ToFixed_DOWN: (data, dp, isFormat) => {
    return isFormat ? new BigNumber(data).toFormat(dp, BigNumber.ROUND_DOWN) : new BigNumber(data).toFixed(dp, BigNumber.ROUND_DOWN);
  },
  ToFixed_UP: (data, dp, isFormat) => {
    return isFormat ? new BigNumber(data).toFormat(dp, BigNumber.ROUND_UP) : new BigNumber(data).toFixed(dp, BigNumber.ROUND_UP);
  },
  Formate: (data, dp) => {
    return new BigNumber(data).toFormat(dp);
  }
}
