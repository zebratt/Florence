import './style.scss';
import React, { Component } from 'react';
import NavBar from '../../components/NavBar/index';
import Header from '../../components/Header/index';
import { URL_REGISTER, URL_SEND_VERITY_CODE } from '../../utils/urls';
import { notification } from 'antd';
import classNames from 'classnames';
import VCode from '../../utils/VCode';
import {getQueryString} from '../../utils/utils';

class Register extends Component {
  state = {
    phone: '',
    password: '',
    passwordConfirm: '',
    checkStatus: true,
    verifyText: '获取验证码',
    verifyUnderCounting: false,
    verifyCodeVal: ''
  };

  componentDidMount() {
    this.vcode = new VCode({
      onTick: lastTime => {
        this.setState({
          verifyText: lastTime + 's'
        });
      },
      onEnd: () => {
        this.setState({
          verifyUnderCounting: false,
          verifyText: '获取验证码'
        });
      }
    });
  }

  onVerifySendClick() {
    const { verifyUnderCounting, phone } = this.state;

    //如果正在倒计时，直接返回
    if (verifyUnderCounting) {
      return;
    }

    if (!/\d{11}/.test(phone)) {
      return notification.warning({
        message: '手机号格式有误，请重新输入！'
      });
    }

    this.setState({
      verifyUnderCounting: true
    });

    this.vcode.start();

    axios.post(URL_SEND_VERITY_CODE, {
      mobile: phone,
      type: 1 //注册：1， 修改密码：2
    }).then((res)=>{
      if(res.code != 1){
        notification.error({
          message: res.msg
        })
      }else{
        notification.success({
          message: '验证码发送成功！'
        })
      }
    })
  }

  onNextHandler() {
    const { phone, password, passwordConfirm, checkStatus, verifyCodeVal } = this.state;

    if (!checkStatus) {
      return notification.warning({
        message: '请先阅读并同意协议！'
      });
    }

    if (!/\d{11}/.test(phone)) {
      return notification.warning({
        message: '手机号格式有误，请重新输入！'
      });
    }

    if (!password) {
      return notification.warning({
        message: '密码不能为空！'
      });
    }

    if (password !== passwordConfirm) {
      return notification.warning({
        message: '两次密码输入不一致，请重新输入！'
      });
    }

    if(!/\d{6}/.test(verifyCodeVal)){
      return notification.warning({
        message: '验证码格式有误！'
      });
    }

    const agentId = getQueryString('agent');

    axios
      .post(URL_REGISTER, {
        customerPhone: phone,
        password: password,
        code: verifyCodeVal,
        parentId: agentId
      })
      .then(res => {
        if (res.code == 1) {
          notification.success({
            message: '注册成功！',
            duration: 1,
            onClose: () => {
              this.props.history.push('/');
            }
          });
        } else {
          notification.error({
            message: res.msg
          });
        }
      });
  }

  onChangeHandler(eve) {
    switch (eve.target.className) {
      case 'phone':
        this.setState({
          phone: eve.target.value
        });

        break;
      case 'password':
        this.setState({
          password: eve.target.value
        });

        break;
      case 'password-confirm':
        this.setState({
          passwordConfirm: eve.target.value
        });

        break;
    }
  }

  render() {
    const {
      phone,
      password,
      passwordConfirm,
      checkStatus,
      verifyUnderCounting,
      verifyText,
      verifyCodeVal
    } = this.state;
    const btnVerifyClasses = classNames({
      'btn-verify': true,
      disabled: verifyUnderCounting
    });

    return (
      <div className="g-page" id="Register">
        <Header />
        <NavBar />
        <div className="main">
          <div className="content">
            <div className="register-box">
              <div className="title">注册</div>
              <div className="form">
                <div className="item">
                  <input
                    className="phone"
                    type="text"
                    value={phone}
                    maxLength={11}
                    placeholder="请输入手机号"
                    onChange={::this.onChangeHandler}
                  />
                </div>
                <div className="item">
                  <input
                    className="password"
                    type="password"
                    maxLength={16}
                    placeholder="请输入密码，长度不小于6位"
                    onChange={::this.onChangeHandler}
                  />
                </div>
                <div className="item">
                  <input
                    className="password-confirm"
                    type="password"
                    maxLength={16}
                    placeholder="请再次输入密码"
                    onChange={::this.onChangeHandler}
                  />
                </div>
                <div className="item verify">
                  <div className="left">
                    <input
                      type="text"
                      value={verifyCodeVal}
                      maxLength={6}
                      onChange={eve => {
                        this.setState({
                          verifyCodeVal: eve.target.value
                        });
                      }}
                      placeholder="请输入验证码"
                    />
                  </div>
                  <div className="right">
                    <button className={btnVerifyClasses} onClick={::this.onVerifySendClick}>
                      {verifyText}
                    </button>
                  </div>
                </div>
                <div className="agree">
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={checkStatus}
                    onChange={() => {
                      this.setState({
                        checkStatus: !checkStatus
                      });
                    }}
                  />
                  <span>我已阅兵并同意</span>
                  <a href="http://www.dyb98.com/user/RegAgree" target="_blank">
                    《系统服务协议》
                  </a>
                </div>
                <button className="btn-next" onClick={::this.onNextHandler}>
                  下一步
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
