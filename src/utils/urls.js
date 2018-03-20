export const URL_LOGIN = '/serverInterface/login/loginCheck'; // 用户登录
export const URL_REGISTER = '/serverInterface/login/registrationCustomer' //用户注册
export const URL_SEND_VERITY_CODE = '/serverInterface/login/sendCode' //发送验证码
export const URL_QUERY_CUSTOMER_BY_TOKEN = '/serverInterface/login/queryCustomerByToken' //使用token查询用户信息
export const URL_CHECK_CODE = '/serverInterface/login/checkCode' //修改密码验证码校验
export const URL_MODIFY_PASSWORD = '/serverInterface/login/forgetPassword' //修改密码

// Settle
export const URL_QUERY_SCHEME_DATA = '/serverInterface/buy/querySchemeData' // 平仓

// MyHome
export const URL_QUERY_FUNDS_DETAILS = '/serverInterface/fund/queryFundDetail' //资金明细
export const URL_DEPOSIT = '/serverInterface/fund/deposit' //投入盘中资金
export const URL_QUERY_BALANCE = '/serverInterface/fund/queryBalance' //查询盘中资金
export const URL_SETTLE = '/serverInterface/fund/settlement' //结算
export const URL_QUERY_FUND_BALANCE = '/serverInterface/fund/queryFundBalance' //余额

// BankCard
export const URL_QUERY_BANK_CARD = '/serverInterface/bank/queryBankCard' // 查询用户所有银行卡
export const URL_WITHDRAW = '/serverInterface/homePage/withdrawalsApply' // 提现
export const URL_ADD_BANKCARD = '/serverInterface/bank/addBankCard' //添加银行卡

// Safe
export const URL_REAL_NAME = '/serverInterface/login/isRealName' // 是否实名认证
export const URL_GO_REAL_NAME = '/serverInterface/login/realNameAuthentication' // 去实名认证

// Notice
export const URL_QUERY_NOTICE = '/serverInterface/notice/queryNotice' // 查询新闻公告
