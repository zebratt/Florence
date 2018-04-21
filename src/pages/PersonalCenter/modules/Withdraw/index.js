import './style.scss'
import * as React from 'react'
import { notification } from 'antd'
import { URL_WITHDRAW } from 'utils/urls'
import { connect } from 'react-redux'
import actions from '../BankCard/action'
import { bindActionCreators } from 'redux'

class Withdraw extends React.Component {
    state = {
        moneyVal: '',
        cardVal: ''
    }
    componentDidMount() {
        const { queryBankCard, customerId, token } = this.props
        queryBankCard(customerId, token)
    }
    onSubmit = () => {
        const { moneyVal } = this.state
        const { customerId, token, bankcards } = this.props

        if (!/^[0-9]+([.]{1}[0-9]{1,3})?$/.test(moneyVal)) {
            return notification.warning({
                message: '提现金额格式有误，请重新输入！'
            })
        }

        axios
            .post(URL_WITHDRAW, {
                customerId: customerId,
                amountMoney: moneyVal,
                bankCardId: bankcards[0].bankCardId,
                client_token: token
            })
            .then(res => {
                if (res.code != 1) {
                    notification.error({
                        message: res.msg
                    })
                } else {
                    notification.success({
                        message: '已提交申请，待处理'
                    })
                    this.props.history.goBack()
                }
            })
    }
    render() {
        const { moneyVal, cardVal } = this.state
        const { bankcards } = this.props
        let addContent = null

        if (!bankcards.length) {
            addContent = (
                <button
                    className="btn-add"
                    onClick={() => {
                        this.props.history.push('bankcard/add')
                    }}
                >
                    添加新的银行卡
                </button>
            )
        }

        if (addContent) {
            return (
                <div id="Withdraw">
                    <div className="withdraw-title">我要提现</div>
                    {addContent}
                </div>
            )
        }

        return (
            <div id="Withdraw">
                <div className="withdraw-title">我要提现</div>
                <div className="line">
                    <div className="label">提现金额：</div>
                    <input
                        type="text"
                        maxLength={8}
                        placeholder="余额小于10元必须全部提取"
                        value={moneyVal}
                        onChange={eve => {
                            this.setState({
                                moneyVal: eve.target.value
                            })
                        }}
                    />
                    <span className="tip">每笔提款收取2元手续费</span>
                </div>
                <div className="line">
                    <div className="label">提现银行卡号：</div>
                    <span>{bankcards[0].bankCardId}</span>
                </div>
                <div className="line">
                    <button className="btn-withdraw" onClick={this.onSubmit}>
                        提交
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { Home, BankCard } = state

    return Object.assign({}, Home, BankCard)
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Withdraw)
