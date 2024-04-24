// 修改用户语种
export function updateUserLanguage(params: { language: string }) {
  return useFetchApi.post("/updateUserLanguage", params);
}

// 获取用户信息
export function getUserInfo() {
  return useFetchApi.post("/getUserInfo");
}

// 注销
export function logOut() {
  return useFetchApi.post("/LogOut");
}

// 修改邮箱或手机
export function updatePhoneEmail(params: { verifyCode: string }) {
  return useFetchApi.post("/updatePhoneEmail", params);
}

// 修改交易密码启用状态
export function updatePasswordVerification(params: {
  verification: "1" | "0";
}) {
  return useFetchApi.post("/updatePasswordVerification", params);
}

// 获取交易帐号列表
export function getAccountList(params: { account: string }) {
  return useFetchApi.post("/getAccountList", params);
}

// 修改昵称
export function updateNickName(params: { im_name: string }) {
  return useFetchApi.post("/updateNickName", params);
}

// 申请实名认证
export function realUser(params: any) {
  return useFetchApi.post("/realUser", params);
}

// 申请解冻
export function unFrozenUser(params: any) {
  return useFetchApi.post("/unFrozenUser", params);
}

// 设置安全认证
export function setSecurityVerify(params: { verifyCode: string }) {
  return useFetchApi.post("/setSecurityVerify", params);
}

// 验证交易密码
export function checkTransactionPassword(params: { password: string }) {
  return useFetchApi.post("/checkTransactionPassword", {
    password: aesCrypto.aesEncrypt(params.password),
  });
}

// 冻结账户
export function frozenUser(params: { password: string }) {
  return useFetchApi.post("/frozenUser", {
    password: aesCrypto.aesEncrypt(params.password),
  });
}

// 获取系统参数
export function getParams(params: any) {
  return useFetchApi.post("/getParams", params);
}

// 修改交易密码
export function updateTransactionPassword(params: any) {
  return useFetchApi.post("/updateTransactionPassword", {
    ...params,
    password: aesCrypto.aesEncrypt(params.password),
  });
}

// 修改默认交易帐号
export function changeAccount(params: { account: string }) {
  return useFetchApi.post("/changeAccount", params);
}

// 删除账户
export function deleteUser() {
  return useFetchApi.post("/deleteUser");
}

// 修改登录密码
export function updateLoginPassword(params: {
  old_password: string;
  new_password: string;
  new_password2: string;
}) {
  return useFetchApi.post("/updateLoginPassword", {
    old_password: aesCrypto.aesEncrypt(params.old_password),
    new_password: aesCrypto.aesEncrypt(params.new_password),
    new_password2: aesCrypto.aesEncrypt(params.new_password2),
  });
}

// 数字钱包
export function getWalletList() {
  return useFetchApi.post("/getWalletList");
}
export function getInvestmentList() {
  return useFetchApi.post("/getInvestmentList");
}
export function getWalletRecordList(params: any) {
  return useFetchApi.post("/getWalletRecordList", params);
}
export function getInvestmentRecordList(params: any) {
  return useFetchApi.post("/getInvestmentRecordList", params);
}
export function getBalanceTransferList(params: any) {
  return useFetchApi.post("/getBalanceTransferList", params);
}
export function getCashRecordList(params: any) {
  return useFetchApi.post("/getCashRecordList", params);
}
 