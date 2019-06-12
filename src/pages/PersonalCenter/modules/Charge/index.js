import './style.scss'
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Input, Button, message, Modal, Row, Col } from 'antd'
import actions from '../AccountSafe/action'
import qs from 'query-string'

class Charge extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dollar: 0,
            visible: false,
            amount: 0,
            remark: ''
        }
    }
    componentDidMount() {
        const { getRealNameStatus, customerId } = this.props
        getRealNameStatus(customerId)
    }
    onSubmit = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({
                    visible: true,
                    ...values
                })
            }
        })
    }
    onAmountChange = eve => {
        this.setState({
            dollar: eve.target.value * 7.5
        })
    }
    onOk = () => {
        const { customerId } = this.props
        fetch(
            `/serverInterface/payment/recharge?${qs.stringify({
                customerId,
                amount: this.state.amount,
                remark: this.state.remark
            })}`
        )
            .then(res => res.json())
            .then(res => {
                if (res.code == 1) {
                    message.success('提交入金成功！')
                    this.props.form.resetFields()

                    this.setState({
                        visible: false
                    })
                } else {
                    message.error(res.msg)
                }
            })
    }
    render() {
        const {
            name,
            cwpCustomers: { customerName }
        } = this.props
        const { getFieldDecorator } = this.props.form

        return (
            <div id="Charge">
                <div className="charge-title">账户充值</div>
                <div style={{ padding: 30 }}>
                    <Form inline>
                        <div className="row">
                            <Form.Item label="真实姓名">{name}</Form.Item>
                        </div>
                        <div className="row">
                            <Form.Item label="交易账户">{customerName}</Form.Item>
                        </div>
                        <div className="row">
                            <Form.Item label="充值金额">
                                {getFieldDecorator('amount', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '金额不能为空'
                                        }
                                    ]
                                })(<Input type="number" onChange={this.onAmountChange} />)}
                            </Form.Item>
                            汇率：<span className="red">7.5</span>&nbsp; 手续费：<span className="red">0</span>&nbsp;
                            美元：<span className="red">{this.state.dollar}</span>&nbsp;
                        </div>
                        <div className="row">
                            <Form.Item label="转账信息">
                                {getFieldDecorator('remark', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '转账信息不能为空'
                                        }
                                    ]
                                })(<Input />)}
                            </Form.Item>
                            <span className="red">银联转账为转账人的姓名、支付宝为支付宝昵称</span>
                        </div>
                        <div className="row">
                            <Button type="dashed" onClick={this.onSubmit}>
                                提交入金
                            </Button>
                        </div>
                    </Form>
                    <div className="tips">
                        <p className="red">
                            业务说明：代充值业务是将人民币转账到制定账户并备注系统显示的附言。客服人员审核后充值到信管家账户。
                        </p>
                        <br />
                        <p className="red">
                            到账时间：转账完成以后，客服人员收到订单对账无误后进行入金。若长时间未到账请联系客服人员，请大家尽量使用微信或支付宝，用以节省到账时间。
                        </p>
                        <br />
                        <p className="red">
                            补充说明：支付时请务必填写页面显示附言，若没有填写则会导致入金无法到账。请及时联系客服人员。
                        </p>
                    </div>
                </div>
                <Modal
                    visible={this.state.visible}
                    onOk={this.onOk}
                    onCancel={() => {
                        this.setState({
                            visible: false
                        })
                    }}
                    okText="支付成功"
                    cancelText="失败"
                    centered
                >
                    <Row>
                        <Col span={6}>
                            <h2>交易账户：</h2>
                        </Col>
                        <Col span={6}>
                            <span className="red">{customerName}</span>
                        </Col>
                        <Col span={6}>
                            <h2>姓名：</h2>
                        </Col>
                        <Col span={6}>
                            <span className="red">{name}</span>
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <br />
                    <Row>
                        <Col span={6}>
                            <h2>入金人民币：</h2>
                        </Col>
                        <Col span={6}>
                            <span className="red">{this.state.amount}</span>
                        </Col>
                        <Col span={6}>
                            <h2>转账信息:</h2>
                        </Col>
                        <Col span={6}>
                            <span className="red">{this.state.remark}</span>
                        </Col>
                    </Row>
                    <div style={{marginTop: 20}}>
                        <p className="red">请确认以上转账信息是否正确，如果正确请将金额转账至下方银行账户：</p>
                        <br />
                        <p className="red">银行卡号：6228480339483599777</p>
                        <p className="red">开户银行：中国农业银行温州江南支行</p>
                        <p className="red">开户姓名：张庭庭</p>
                    </div>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = state => {
    const { Safe, Home } = state

    return Object.assign({}, Safe, Home)
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch)
}

export default Form.create()(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Charge)
)
