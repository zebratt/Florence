/**
 * Created by xuejian.xu on 2017/12/11.
 */

import './style.scss';
import React, { Component } from 'react';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar/index';
import classNames from 'classnames';
import { notification } from 'antd';
import { URL_SEND_VERITY_CODE, URL_CHECK_CODE, URL_MODIFY_PASSWORD } from '../../utils/urls';

const steps = ['手机获取验证码', '验证码校验', '修改新密码'];

class ForgetPassword extends Component {
    state = {
        step: 0,
        phoneVal: '',
        vcodeVal: '',
        newPasswordVal: '',
        newPasswordConfirmVal: ''
    };

    renderStepOne() {
        const { phoneVal } = this.state;

        return (
            <div className="form">
                手机号：<input
                    className="input"
                    type="text"
                    placeholder="请输入手机号"
                    maxLength={11}
                    value={phoneVal}
                    onChange={eve => {
                        this.setState({
                            phoneVal: eve.target.value
                        });
                    }}
                />
                <button
                    className="btn"
                    onClick={() => {
                        if (!/\d{11}/.test(phoneVal)) {
                            return notification.warning({
                                message: '手机号格式有误，请重新输入！'
                            });
                        }

                        axios
                            .post(URL_SEND_VERITY_CODE, {
                                mobile: phoneVal,
                                type: 2
                            })
                            .then(res => {
                                if (res.code != 1) {
                                    notification.error({
                                        message: res.msg
                                    });
                                } else {
                                    notification.success({
                                        message: '验证码发送成功！'
                                    });

                                    this.setState({
                                        step: 1
                                    });
                                }
                            });
                    }}
                >
                    发送验证码
                </button>
            </div>
        );
    }

    renderStepTwo() {
        const { vcodeVal, phoneVal } = this.state;

        return (
            <div className="form">
                验证码:{' '}
                <input
                    type="text"
                    className="input"
                    placeholder="请输入你收到的验证码"
                    maxLength={6}
                    value={vcodeVal}
                    onChange={eve => {
                        this.setState({
                            vcodeVal: eve.target.value
                        });
                    }}
                />
                <button
                    className="btn"
                    onClick={() => {
                        if (!/\d{6}/.test(vcodeVal)) {
                            return notification.warning({
                                message: '验证码格式有误！'
                            });
                        }

                        axios
                            .post(URL_CHECK_CODE, {
                                mobile: phoneVal,
                                code: vcodeVal
                            })
                            .then(res => {
                                if (res.code != 1) {
                                    notification.error({
                                        message: res.msg
                                    });
                                } else {
                                    notification.success({
                                        message: '验证通过！'
                                    });

                                    this.setState({
                                        step: 2
                                    });
                                }
                            });
                    }}
                >
                    确定
                </button>
            </div>
        );
    }

    renderStepThree() {
        const { newPasswordVal, newPasswordConfirmVal, phoneVal } = this.state;

        return (
            <div className="form">
                <div className="item">
                    <span className="label">新密码：</span>
                    <input
                        type="password"
                        className="input"
                        maxLength={16}
                        placeholder="请输入新密码"
                        value={newPasswordVal}
                        onChange={eve => {
                            this.setState({
                                newPasswordVal: eve.target.value
                            });
                        }}
                    />
                </div>
                <div className="item">
                    <span className="label">确认新密码：</span>
                    <input
                        type="password"
                        className="input"
                        maxLength={16}
                        placeholder="请确认新密码"
                        value={newPasswordConfirmVal}
                        onChange={eve => {
                            this.setState({
                                newPasswordConfirmVal: eve.target.value
                            });
                        }}
                    />
                </div>
                <div className="item">
                    <button
                        className="btn"
                        onClick={() => {
                            if (!newPasswordVal || !newPasswordConfirmVal) {
                                return notification.warning({
                                    message: '密码不能为空！'
                                });
                            }

                            if (newPasswordVal !== newPasswordConfirmVal) {
                                return notification.warning({
                                    message: '两次密码输入不一致，请重新输入！'
                                });
                            }

                            axios
                                .post(URL_MODIFY_PASSWORD, {
                                    mobile: phoneVal,
                                    nowPassword: newPasswordVal,
                                    confirmPassword: newPasswordVal
                                })
                                .then(res => {
                                    if (res.code != 1) {
                                        notification.error({
                                            message: res.msg
                                        });
                                    } else {
                                        notification.success({
                                            message: '修改成功！',
                                            duration: 2
                                        });

                                        this.props.history.push('/');
                                    }
                                });
                        }}
                    >
                        确认
                    </button>
                </div>
            </div>
        );
    }

    render() {
        const { step } = this.state;
        let stepContent = null;

        switch (step) {
            case 0:
                stepContent = this.renderStepOne();
                break;
            case 1:
                stepContent = this.renderStepTwo();
                break;
            case 2:
                stepContent = this.renderStepThree();
                break;
        }

        return (
            <div id="ForgetPassword">
                <Header history={this.props.history} />
                <NavBar />
                <div className="main">
                    <div className="title">忘记密码</div>
                    <ul className="steps">
                        {steps.map((item, idx) => {
                            const iconCtn = idx < 2 ? <span className="icon i-arrow_right" /> : '';
                            const classes = classNames({
                                red: idx === step
                            });

                            return (
                                <li key={item} className={classes}>
                                    {item}
                                    {iconCtn}
                                </li>
                            );
                        })}
                    </ul>
                    {stepContent}
                </div>
            </div>
        );
    }
}

export default ForgetPassword;
