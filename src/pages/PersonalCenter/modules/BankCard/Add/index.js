import './style.scss';
import * as React from 'react';
import provinces from 'utils/provinces';
import banks from './banks';
import { Select, Cascader, notification } from 'antd';
import { connect } from 'react-redux';
import { URL_ADD_BANKCARD } from 'utils/urls';
const Option = Select.Option;

class AddCard extends React.Component {
    state = {
        cardVal: '',
        bankName: '工商银行',
        province: '',
        city: '',
        branch: ''
    };
    onProvinceChange = (value, items) => {
        this.setState({
            province: items[0].label,
            city: items[1].label
        });
    };
    onBankChange = value => {
        this.setState({
            bankName: value
        });
    };
    onSubmit = () => {
        const { customerId, token } = this.props;
        const { cardVal, bankName, province, city, branch } = this.state;

        if (!/^\d+$/.test(cardVal)) {
            return notification.warning({
                message: '银行卡号格式有误，请重新输入！'
            });
        }

        if (!city || !province) {
            return notification.warning({
                message: '请选择省份和城市！'
            });
        }

        if (!branch) {
            return notification.warning({
                message: '支行名称不得为空！'
            });
        }

        axios
            .post(URL_ADD_BANKCARD, {
                client_token: token,
                bankAdress: branch,
                bankCity: city,
                bankprovince: province,
                bankName: bankName,
                customerId: customerId,
                bankCardId: cardVal
            })
            .then(res => {
                if (res.code != 1) {
                    notification.error({
                        message: res.msg
                    });
                } else {
                    notification.success({
                        message: '添加银行卡成功!'
                    });

                    this.props.history.goBack();
                }
            });
    };
    render() {
        const { cardVal, bankName } = this.state;
        return (
            <div className="add-card">
                <div className="add-title">添加银行卡</div>
                <div className="item">
                    <div className="label">银行卡号</div>
                    <input
                        type="text"
                        className="input"
                        maxLength={21}
                        placeholder="请输入银行卡号"
                        onChange={eve => {
                            this.setState({
                                cardVal: eve.target.value
                            });
                        }}
                    />
                </div>
                <div className="item">
                    <div className="label">开户银行</div>
                    <Select defaultValue="工商银行" onChange={this.onBankChange}>
                        {banks.map(bank => (
                            <Option key={bank} value={bank}>
                                {bank}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className="item">
                    <div className="label">省份城市</div>
                    <Cascader options={provinces} onChange={this.onProvinceChange} placeholder="请选择省份和城市" />
                </div>
                <div className="item">
                    <div className="label">支行名称</div>
                    <input
                        type="text"
                        className="input"
                        placeholder="请输入支行名称"
                        onChange={eve => {
                            this.setState({
                                branch: eve.target.value
                            });
                        }}
                    />
                </div>
                <div className="item">
                    <button className="btn-submit" onClick={this.onSubmit}>
                        提交
                    </button>
                </div>
                <div className="warning">
                    <p>每个客户只能添加一张银行卡，请务必填写与您本人真实姓名绑定的银行卡，且银行卡信息确认无误，以便提款资金及时到帐</p>
                    <p>注意：由客户填写错误银行卡信息所造成的提款延误，客户需自行承担责任</p>
                    <p>如果遇到问题请拨打客服热线 4008261289 以便我们及时帮您处理</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { Home } = state;

    return Object.assign({}, Home);
};

export default connect(mapStateToProps)(AddCard);
