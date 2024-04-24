import {
  getFinancialProjectList,
  getFinancialOrderList,
  buyFinancialProject,
  redemptionFinancialOrder,
} from "~/api/financial";

export default () => {
  const FPList = useState("FPList", () => []);
  const getFPList = async () => {
    const { list } = await getFinancialProjectList();
    FPList.value = list;
  };

  const FPOrderList = useState("FPOrderList", () => []);
  const getFPOrderList = async () => {
    const { list } = await getFinancialOrderList();
    FPOrderList.value = list;
  };

  return {
    FPList,
    getFPList,
    FPOrderList,
    getFPOrderList,
  };
};
