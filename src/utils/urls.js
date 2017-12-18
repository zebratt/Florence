export const URL_LOGIN = '/serverInterface/login/loginCheck'; // 用户登陆
export const URL_REGISTER = '/serverInterface/login/registrationCustomer' //用户注册
export const URL_STOCK_DATA = '/finance/stock/hs' //获取股票数据
export const URL_PURCHASE = '/serverInterface/buy/saveStockOrder' //报单接口
export const URL_SUGGEST = '/suggest/type=111&key=' //股票建议接口
export const URL_SEND_VERITY_CODE = '/serverInterface/login/sendCode' //发送验证码
export const URL_QUERY_CUSTOMER_BY_TOKEN = '/serverInterface/login/queryCustomerByToken' //使用token查询用户信息
export const URL_GET_FORBIDDEN_LIST = '/chartK/wcp/StockForbidden/GetList' //获取停牌列表
export const URL_CHECK_CODE = '/serverInterface/login/checkCode' //修改密码验证码校验
export const URL_MODIFY_PASSWORD = '/serverInterface/login/forgetPassword' //修改密码

// Sell
export const URL_POSITION_DATA = '/serverInterface/buy/queryPositionData' //持仓
export const URL_SELL_OUT_STOCK = '/serverInterface/buy/sellOutStockOrder' //卖出
export const URL_CLINCH_RECORD = '/serverInterface/clinchRecord/queryHistoryClinchRecord' //历史记录

// Settle
export const URL_QUERY_SCHEME_DATA = '/serverInterface/buy/querySchemeData' // 平仓

// MyHome
export const URL_QUERY_FUNDS_DETAILS = '/serverInterface/homePage/queryFundsDetails' //资金明细

// BankCard
export const URL_QUERY_BANK_CARD = '/serverInterface/bank/queryBankCard' // 查询用户所有银行卡
export const URL_WITHDRAW = '/serverInterface/homePage/withdrawalsApply' // 提现
export const URL_ADD_BANKCARD = '/serverInterface/bank/addBankCard' //添加银行卡

// Safe
export const URL_REAL_NAME = '/serverInterface/login/isRealName' // 是否实名认证
export const URL_GO_REAL_NAME = '/serverInterface/login/realNameAuthentication' // 去实名认证

