/**
 * @fileOverView: 账户安全
 * @author: xuejian.xu
 * @date: 2017/11/18.
 */

import './style.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import { bindActionCreators } from 'redux';
import actions from './action';
import classNames from 'classnames';
import { Route } from 'react-router-dom';
import Verify from './Verify';

class AccountSafe extends Component {
    componentDidMount() {
        const { getRealNameStatus, customerId } = this.props;
        getRealNameStatus(customerId);
    }
    gotoVerify = () => {
        this.props.history.push('safe/verify');
    };
    render() {
        const { cwpCustomers, hasRealName, idCard, name } = this.props;
        const phone = _get(cwpCustomers, 'customerName');
        const realNameClasses = classNames({
            checked: true,
            green: hasRealName
        });
        const realNameContent = hasRealName ? (
            <span>认证通过</span>
        ) : (
            <button className="btn" onClick={this.gotoVerify}>
                去认证
            </button>
        );

        return (
            <div>
                <div className="title">账户安全</div>
                <table className="table">
                    <tbody>
                        <tr>
                            <td className="checked green" width={'10%'}>
                                <span className="icon i-checked" />
                            </td>
                            <td className="label" width={'20%'}>
                                绑定手机:
                            </td>
                            <td width={'50%'}>{phone}</td>
                            <td width={'20%'} />
                        </tr>
                        <tr>
                            <td className={realNameClasses} width={'10%'}>
                                <span className="icon i-checked" />
                            </td>
                            <td className="label" width={'20%'}>
                                姓名
                            </td>
                            <td width={'50%'}>{name}</td>
                            <td width={'20%'}>{realNameContent}</td>
                        </tr>
                        <tr>
                            <td className={realNameClasses} width={'10%'}>
                                <span className="icon i-checked" />
                            </td>
                            <td className="label" width={'20%'}>
                                身份证号
                            </td>
                            <td width={'50%'}>{idCard}</td>
                            <td width={'20%'} />
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { Home, Safe } = state;

    return Object.assign({}, Home, Safe);
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch);
};

export default () => {
    return (
        <div id="AccountSafe">
            <Route path="/personal/safe/verify" component={Verify} />
            <Route exact path="/personal/safe" component={connect(mapStateToProps, mapDispatchToProps)(AccountSafe)} />
        </div>
    );
};
