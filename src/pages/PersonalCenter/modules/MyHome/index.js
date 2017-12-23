/**
 * @fileOverView:  我的首页
 * @author: xuejian.xu
 * @date: 2017/11/18.
 */

import './style.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from './action'
import _get from 'lodash/get'
import { Route } from 'react-router-dom'
import { notification } from 'antd';
import { URL_DEPOSIT, URL_SETTLE } from 'utils/urls'

class MyHome extends Component {
    state = {
        depositVal: ''
    }
    componentDidMount() {
        const { queryBalance, queryFundDetails, queryFundBalance, customerId, token } = this.props

        if (customerId) {
            queryFundDetails(customerId, token, 0);
            queryBalance(customerId, token);
            queryFundBalance(customerId, token);
        }
    }

    onNavButtonClick(isPrev) {
        const { queryFundDetails, customerId, token, currentPageIndex, totalPages } = this.props

        if (isPrev) {
            if (currentPageIndex > 0) {
                queryFundDetails(customerId, token, currentPageIndex - 1)
            }
        } else {
            if (currentPageIndex < totalPages - 1) {
                queryFundDetails(customerId, token, currentPageIndex + 1)
            }
        }
    }

    onDepositConfirmHandler = () => {
        const {depositVal} = this.state;
        const {customerId, token} = this.props;

        if(!/^\d+$/.test(depositVal)){
            return notification.warning({
                message: '投入资金格式有误，请重新输入！'
            })
        }

        axios.post(URL_DEPOSIT, {
            customerId: customerId,
            amount: depositVal,
            client_token: token
        }).then((res) => {
            if(res.code != 1){
                notification.error({
                    message: res.msg
                })
            }else{
                notification.success({
                    message: '投入成功！'
                })

                this.setState({
                    depositVal: ''
                })
            }
        })
    }

    onSettleHandler = () => {
        const {customerId, token} = this.props;

        axios.post(URL_SETTLE, {
            customerId,
            client_token: token
        }).then((res) => {
            if(res != 1){
                notification.error({
                    message: res.msg
                })
            }else{
                notification.success({
                    message: '结算成功！'
                })
            }
        })
    }

    render() {
        const { history, fundDetails, currentPageIndex, totalPages, cwpCustomers,balance, fundBalance, customerId, token } = this.props

        return (
            <div>
                <div className="top">
                    <div className="flex-1">
                        <div className="balance">
                            <p>账户余额</p>
                            <p className="red">{fundBalance}</p>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="fund">
                            <p>盘中权益资金</p>
                            <p className="tip">(请以终端或刷新后的数据为准)</p>
                            <p className="red">{balance}</p>
                        </div>
                    </div>
                    <div className="flex-1">
                        <button className="btn btn-charge" onClick={() => {
                            this.props.queryBalance(customerId, token);
                        }}>
                            刷新
                        </button>
                    </div>
                    <div className="flex-1">
                        <button className="btn btn-withdraw" onClick={this.onSettleHandler}>
                            结算
                        </button>
                    </div>
                </div>
                <div className="deposit">
                    <span className="label">投入盘中资金：</span>
                    <input className="input" type="text" value={this.state.depositVal} onChange={(eve) => {
                        this.setState({
                            depositVal: eve.target.value
                        })
                    }}/>
                    <button className="btn-confirm" onClick={this.onDepositConfirmHandler}>确认</button>
                </div>
                <div className="title">资金明细</div>
                <table className="table">
                    <thead>
                        <tr className="tl">
                            <td>流向</td>
                            <td>变动金额</td>
                            <td>充值金额</td>
                            <td>变动时间</td>
                            <td>备注信息</td>
                        </tr>
                    </thead>
                    <tbody>
                        {fundDetails.map((item, idx) => {
                            const flowWay = item.flowWay === 0 ? '支出' : '收入'
                            return (
                                <tr key={idx}>
                                    <td>{flowWay}</td>
                                    <td>{item.changeAmount}</td>
                                    <td>{item.chargeAmount}</td>
                                    <td>{item.changeTime}</td>
                                    <td>{item.remark}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="table-nav">
                    <button className="btn" onClick={this.onNavButtonClick.bind(this, true)}>
                        上一页
                    </button>
                    当前第<span>{currentPageIndex + 1}</span>页，总共<span>{totalPages}</span>页
                    <button className="btn" onClick={this.onNavButtonClick.bind(this, false)}>
                        下一页
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { MyHome, Home } = state

    return Object.assign({}, MyHome, Home)
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch)
}

export default () => {
    return (
        <div id="MyHome">
            <Route exact path="/personal/home" component={connect(mapStateToProps, mapDispatchToProps)(MyHome)} />
        </div>
    )
}
