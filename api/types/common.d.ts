export interface PageInfo {
  /**
   * 页码
   */
  pageNum?: string;
  /**
   * 每页行数
   */
  pageSize?: string;
}

export interface GetLanguageList extends PageInfo {
  /**
   * 符号
   */
  symbol?: string;
  /**
   * 名称
   */
  title?: string;
  [property: string]: any;
}

export interface GetVerifyCode {
  /**
   * 收验证码的号码，已登陆用户不必填写（修改手机、邮箱除外）
   */
  account: string;
  /**
   * 接口
   */
  action: string;
  /**
   * 语种
   */
  language: string;
  /**
   * phone 、 email、 all、phone_update、email_update
   */
  type: string;
  [property: string]: any;
}

export interface Login {
  account: string;
  client: string;
  password: string;
  [property: string]: any;
}

export interface GetProductList extends PageInfo {
  /**
   * 首页是否显示 1-显示 0-全部
   */
  index?: string;
  second_contract?: string;
  /**
   * 产品编码
   */
  symbol: string;
  [property: string]: any;
}

export interface Register {
  /**
   * 必须与获取验证码的号码相同
   */
  account: string;
  area_code: string;
  /**
   * 语言
   */
  language: string;
  /**
   * 密码
   */
  password: string;
  /**
   * 推荐码
   */
  recommend_code: string;
  /**
   * 验证码
   */
  verifyCode: string;
  [property: string]: any;
}

export interface RecoverPassword {
  /**
   * 新密码
   */
  password: string;
  /**
   * 重复密码
   */
  re_password: string;
  /**
   * 验证码
   */
  verifyCode: string;
  [property: string]: any;
}

export interface GetCurrencyList extends PageInfo {
  /**
   * 符号
   */
  symbol?: string;
  /**
   * 名称
   */
  title?: string;
  /**
   * 1-法定货币 2-数字货币
   */
  type?: string;
  [property: string]: any;
}

export interface GetPriceList {
  count: string;
  /**
   * 结束时间
   */
  endTime: string;
  /**
   * 符号
   */
  symbol: string;
  type: string;
  [property: string]: any;
}
