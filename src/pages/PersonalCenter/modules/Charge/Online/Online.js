import React from 'react'
import { notification } from 'antd'
import banks from './banks'

class Online extends React.Component {
    state = {
        amountVal: '',
        currentBankCode: ''
    }
    onChangeHandler = eve => {
        this.setState({
            amountVal: eve.target.value
        })
    }
    onSubmitHandler = eve => {
        const { amountVal, currentBankCode } = this.state
        const { customerId } = this.props

        if (!currentBankCode) {
            return notification.warning({
                message: '请先选择银行'
            })
        }

        if (!/^\d+$/.test(amountVal) || amountVal < 100 || amountVal % 100 !== 0) {
            return notification.warning({
                message: '充值金额必须大于100，必须是100的整数倍'
            })
        }

        axios
            .post('/serverInterface/payment/verification', {
                amount: amountVal,
                customerId,
                bankCard: currentBankCode
            })
            .then(res => {
                if (res.code == 1) {
                    const params = [`amount=${amountVal}`, `customerId=${customerId}`, `bankCard=${currentBankCode}`]

                    location.href = 'http://payfor.chundongh.cn/serverInterface/payment/placeOrder?' + params.join('&')
                } else {
                    notification.error({
                        message: res.msg
                    })
                }
            })
    }
    onImgClick = id => {
        this.setState({
            currentBankCode: id
        })
    }
    renderBanks = () => {
        return (
            <div className="banks">
                <div className="title">1. 请选择银行</div>
                <div className="box">
                    {banks.map(bank => {
                        const isChecked = this.state.currentBankCode === bank.code

                        return (
                            <div key={bank.code} className="bank">
                                <input
                                    onClick={this.onImgClick.bind(this, bank.code)}
                                    checked={isChecked}
                                    type="radio"
                                    name="bank"
                                />
                                <img
                                    onClick={this.onImgClick.bind(this, bank.code)}
                                    src={`//odl96infd.bkt.clouddn.com/${bank.code}.png`}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className="online">
                {this.renderBanks()}
                <div className="amount">
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
                <div className="tip">单笔充值最少100，金额必须为100的整数倍，每笔充值收取0.5%手续费</div>
            </div>
        )
    }
}

export default Online
