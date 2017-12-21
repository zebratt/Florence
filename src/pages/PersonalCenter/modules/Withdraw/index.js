import './style.scss';
import * as React from 'react';
import { notification } from 'antd';
import { URL_WITHDRAW } from 'utils/urls';
import { connect } from 'react-redux';

class Withdraw extends React.Component {
    state = {
        moneyVal: '',
        cardVal: ''
    };
    onSubmit = () => {
        const { moneyVal, cardVal } = this.state;
        const { customerId, token } = this.props;

        if (!/^\d+$/.test(moneyVal)) {
            return notification.warning({
                message: '提现金额格式有误，请重新输入！'
            });
        }

        if (!/^\d+$/.test(cardVal)) {
            return notification.warning({
                message: '银行卡格式有误，请重新输入！'
            });
        }

        axios
            .post(URL_WITHDRAW, {
                customerId: customerId,
                amountMoney: moneyVal,
                bankCardId: cardVal,
                client_token: token
            })
            .then(res => {
                if (res.code != 1) {
                    notification.error({
                        message: res.msg
                    });
                } else {
                    notification.success({
                        message: '提现成功！'
                    });
                    this.props.history.goBack();
                }
            });
    };
    render() {
        const { moneyVal, cardVal } = this.state;
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
                            });
                        }}
                    />
                </div>
                <div className="line">
                    <div className="label">提现银行卡号：</div>
                    <input
                        type="text"
                        maxLength={21}
                        value={cardVal}
                        onChange={eve => {
                            this.setState({
                                cardVal: eve.target.value
                            });
                        }}
                    />
                </div>
                <div className="line">
                    <button className="btn-withdraw" onClick={this.onSubmit}>
                        提交
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { Home } = state;

    return Object.assign({}, Home);
};

export default connect(mapStateToProps)(Withdraw);
