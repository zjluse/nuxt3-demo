import { BigNumber } from "bignumber.js";
import { getUserInfo, getWalletList, getInvestmentList } from "~/api/user";

export default () => {
  const userToken = useUserStote();
  const { token } = storeToRefs(userToken);
  const currencyStore = useCurrencyStore();
  const { exchangeRate } = storeToRefs(currencyStore);
  const { FPOrderList } = useFinlsProjectList();
  const isLogin = computed(() => {
    return !!token.value;
  });

  userToken.saveToken(
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.a2V5IjoiQmZUMTNpeWFDeHk4WHYyOSJ9eyJjb2RlIjoiNjYxOTkwNzY2MzIzIiwi.2sOy4wKnu1TxBDoYVqvQE8WdBejGXBthKccWOpMsJMM"
  );

  // 用户基本信息
  const userBaseInfo = useState("account", () => {
      return {
        //
      };
  });

  const getUserBaseInfo = async () => {
    try {
      const response = await getUserInfo();
      userBaseInfo.value = response;
    } catch (err) {}
  };

  // ?
  const investmentData = useState("investmentData", () => []);
  const getInvestmentData = async () => {
    try {
      const { list } = await getInvestmentList();
      investmentData.value = list;
    } catch (err) {}
  };

  // 数字钱包
  const walletData = useState("walletData", () => []);
  const getWalletData = async () => {
    try {
      const { list } = await getWalletList();
      walletData.value = list;
    } catch (err) {}
  };

  // 累计收益
  const earnings = computed(() => {
    let total = new BigNumber(0);

    FPOrderList.value.forEach((i: any) => {
      total = total.plus(i.profit);
    });
    return bigNumber.ToFixed_DOWN(total, 2);
  });

  // 总资产估值(USDT)
  const totalAssets = computed(() => {
    let total = new BigNumber(0);

    investmentData.value?.forEach((i: any) => {
      total = total.plus(i.balance).plus(i.frozen);
    });
    FPOrderList.value?.forEach((i: any) => {
      if (i.status == 4 || i.status == 1 || i.status == 8) {
        total = total.plus(i.amount);
      }
    });
    return bigNumber.ToFixed_DOWN(total, 2);
  });

  // 可用余额
  const availableBalance = computed(() => {
    let total = new BigNumber(0);
    investmentData.value?.forEach((i: any) => {
      if (i.type != 2) {
        total = total.plus(i.balance);
      }
    });
    return bigNumber.ToFixed_DOWN(total, 2);
  });

  // 预付金融账户
  const prepaidAccount = computed(() => {
    let total = new BigNumber(0);
    investmentData.value?.forEach((i: any) => {
      if (i.type == 2) {
        total = total.plus(i.balance);
      }
    });
    return bigNumber.ToFixed_DOWN(total, 2);
  });

  // 冻结金额
  const frozenBalance = computed(() => {
    let total = new BigNumber(0);
    investmentData.value?.forEach((i: any) => {
      total = total.plus(i.frozen);
    });
    return bigNumber.ToFixed_DOWN(total, 2);
  });

  // 数字钱包相关----->
  // 总资产
  const digital_totalAssets = computed(() => {
    let total = new BigNumber(0);
    if (walletData.value.length && exchangeRate.value) {
      walletData.value.forEach((i: any) => {
        total = total.plus(new BigNumber(i.balance).plus(i.frozen).times(exchangeRate.value[i.symbol]?.rate || 1));
      })
    }
    return bigNumber.ToFixed_DOWN(total, 2);
  })
  



  return {
    isLogin,
    userBaseInfo,
    getUserBaseInfo,
    investmentData,
    getInvestmentData,
    walletData,
    getWalletData,
    earnings,
    totalAssets,
    availableBalance,
    prepaidAccount,
    frozenBalance,
    digital_totalAssets
  };
};
