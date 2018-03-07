import './style.scss'

import React, { Component } from 'react'
import { Carousel } from 'react-responsive-carousel'
import NavBar from 'components/NavBar'
import Header from 'components/Header/index'
import { notification } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from './action'
import { URL_LOGIN } from '../../utils/urls'
import Cookies from 'js-cookie'

class Home extends Component {
    state = {
        username: '',
        password: ''
    }

    onLoginHandler = () => {
        const { username, password } = this.state
        const { updateLogin, history } = this.props

        if (!username || !password) {
            return notification.warning({
                message: '用户名或密码不能为空！'
            })
        }

        axios
            .post(URL_LOGIN, {
                customerPhone: username,
                customerPassword: password
            })
            .then(res => {
                if (res.code == 1) {
                    const { data: { token, cwpCustomers } } = res

                    notification.success({
                        message: '登录成功！'
                    })

                    //用户登录信息保存30天
                    Cookies.set('TOKEN', token, { expires: 30 })

                    updateLogin(true, token, cwpCustomers)
                } else {
                    notification.error({
                        message: res.msg
                    })
                }
            })
    }

    renderLogin = () => {
        const { username, password } = this.state
        const { history } = this.props

        return (
            <div className="login">
                <div className="content">
                    <div className="title">登录系统</div>
                    <div className="label">账号:</div>
                    <input
                        className="input"
                        type="text"
                        placeholder="请输入用户名"
                        value={username}
                        onChange={eve => {
                            this.setState({ username: eve.target.value })
                        }}
                    />
                    <div className="label">密码:</div>
                    <input
                        className="input"
                        type="password"
                        placeholder="请输入密码"
                        value={password}
                        onChange={eve => {
                            this.setState({ password: eve.target.value })
                        }}
                    />
                    <div
                        className="forget"
                        onClick={() => {
                            history.push('/forget')
                        }}
                    >
                        忘记密码
                    </div>
                    <div className="buttons">
                        <div className="left">
                            <button className="btn" onClick={this.onLoginHandler}>
                                登录
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const { username, password } = this.state
        const { loginStatus, history } = this.props

        return (
            <div className="g-page" id="Home">
                <Header />
                <NavBar />
                <Carousel
                    emulateTouch
                    showArrows={true}
                    showThumbs={false}
                    infiniteLoop
                    autoPlay
                    interval={3000}
                    showStatus={false}
                >
                    <img className="banner" src="http://odl96infd.bkt.clouddn.com/11.jpg" alt="" />
                    <img className="banner" src="http://odl96infd.bkt.clouddn.com/22.jpg" alt="" />
                    <img className="banner" src="http://odl96infd.bkt.clouddn.com/33.jpg" alt="" />
                    <img className="banner" src="http://odl96infd.bkt.clouddn.com/44.jpg" alt="" />
                </Carousel>
                {!loginStatus && this.renderLogin()}
                <div className="propaganda">
                    <div className="item"></div>
                    <div className="item"></div>
                    <div className="item"></div>
                    <div className="item"></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { Home } = state

    return { loginStatus: Home.loginStatus }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
