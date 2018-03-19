import './style.scss'
import * as React from 'react'
import { Route } from 'react-router-dom'
import imgLogo from './images/jsyh.png'
import imgQr from './images/alipay.png'
import classNames from 'classnames'
import tabs from './tabs'
import { connect } from 'react-redux'
import { notification } from 'antd'

export default class Charge extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currTab: props.match.params.tab || 'bankcard'
        }
    }
    tabClick = key => {
        this.setState({
            currTab: key
        })

        this.props.history.push(key)
    }
    render() {
        return (
            <div id="Charge">
                <div className="charge-title">账户充值</div>
                <ul className="nav">
                    {tabs.map(tab => {
                        const classes = classNames({
                            active: tab.key === this.state.currTab
                        })

                        return (
                            <li
                                key={tab.key}
                                className={classes}
                                onClick={() => {
                                    this.tabClick(tab.key)
                                }}
                            >
                                {tab.name}
                            </li>
                        )
                    })}
                </ul>
                <Route exact path="/personal/charge/bankcard" component={Bankcard} />
                <Route
                    exact
                    path="/personal/charge/online"
                    component={connect(state => {
                        const { Home } = state

                        return Object.assign({}, Home)
                    })(Online)}
                />
            </div>
        )
    }
}

const Bankcard = () => {
    return (
        <div className="bankcard">
            <div className="bold">您可以通过网上银行、银行柜台或ATM机转账</div>
            <div className="line">请务必在转账备注中填写注册手机号，这样方便我们多重信息确认您的汇款。</div>
            <div className="line">转账成功后，请及时联系您的专属客户经理， 以便我们及时帮您处理</div>
            <table className="charge-table">
                <tbody>
                    <tr>
                        <td width="25%">
                            <img className="logo" src={imgLogo} alt="" />
                        </td>
                        <td>
                            <p>帐号：6236681420017411570</p>
                            <p>户名：金时</p>
                            <p>开户行：温州黎明支行</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="line">
                注意：用户网银转账之后，请务必保留网银转账成功时的截图，并在资金或者转账用途中备注清自己要转入帐号所用的注册手机号码，并及时联系专属客户经理，以便尽快到账！
            </div>
            <div className="line">8：30——15：00充值入金，正常到账时间为30分钟之内</div>
        </div>
    )
}

class Online extends React.Component {
    state = {
        amountVal: ''
    }
    onChangeHandler = eve => {
        this.setState({
            amountVal: eve.target.value
        })
    }
    onSubmitHandler = eve => {
        const { amountVal } = this.state
        const { customerId } = this.props

        if (!/^\d+$/.test(amountVal)) {
            return notification.warning({
                message: '金额输入有误！'
            })
        }

        const params = [`amount=${amountVal}`, `paymod=plain`, `customerId=${customerId}`]
        location.href = '/serverInterface/netpay/placeOrder?' + params.join('&')
    }
    render() {
        return (
            <div className="online">
                <label htmlFor="chargeAmount">充值金额：</label>
                <input
                    name="amount"
                    maxLength="6"
                    className="charge-input"
                    id="chargeAmount"
                    type="text"
                    value={this.state.amountVal}
                    onChange={this.onChangeHandler}
                />
                <button className="btn-confirm" onClick={this.onSubmitHandler}>
                    确定
                </button>
            </div>
        )
    }
}
