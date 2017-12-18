/**
 * @fileOverView: 个人中心
 * @author: xuejian.xu
 * @date: 2017/11/18.
 */

import './style.scss';
import React, { Component } from 'react';
import NavBar from '../../components/NavBar/index';
import Header from '../../components/Header/index';
import classNames from 'classnames';
import MyHome from './modules/MyHome';
import BankCard from './modules/BankCard/index';
import AccountSafe from './modules/AccountSafe/index';
import Promote from './modules/Promote/index';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import tabs from './tabs';

class PersonalCenter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTabKey: props.match.params.tab || 'home'
        };
    }

    onMenuTabClick(key) {
        this.props.history.push('/personal/' + key);

        this.setState({
            currentTabKey: key
        });
    }

    render() {
        const { currentTabKey } = this.state;
        const { customerId, cwpCustomers: { customerName } } = this.props;

        let tabContent = null;

        if (!customerId) {
            tabContent = (
                <div className="content">
                    <div>请先登录!</div>
                </div>
            );
        } else {
            tabContent = (
                <div className="content">
                    <Route path="/personal/home" component={MyHome} />
                    <Route path="/personal/bankcard" component={BankCard} />
                    <Route path="/personal/safe" component={AccountSafe} />
                    <Route path="/personal/promote" component={Promote} />
                </div>
            );
        }

        return (
            <div id="PersonalCenter">
                <Header history={this.props.history} />
                <NavBar />
                <div className="main">
                    <div className="menu">
                        <div className="title">会员中心</div>
                        <div className="profile">欢迎您：{customerName}</div>
                        <div className="menus">
                            {tabs.map(tab => {
                                const classes = classNames({
                                    item: true,
                                    active: tab.key === currentTabKey
                                });

                                return (
                                    <div key={tab.key} className={classes} onClick={this.onMenuTabClick.bind(this, tab.key)}>
                                        {tab.name}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {tabContent}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { Home } = state;

    return Object.assign({}, Home);
};

export default connect(mapStateToProps)(PersonalCenter);
