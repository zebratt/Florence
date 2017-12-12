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

const tabs = [
  {
    name: '我的首页',
    key: 'MyHome'
  },
  {
    name: '银行卡管理',
    key: 'BankCard'
  },
  {
    name: '账户安全',
    key: 'AccountSafe'
  },
  {
    name: '推广赚钱',
    key: 'Promote'
  }
];

class PersonalCenter extends Component {
  state = {
    currentTabKey: 'MyHome',
    currentComp: MyHome
  };

  onMenuTabClick(key) {
    this.setState({
      currentTabKey: key
    });
  }

  renderBody(currentTabKey) {
    const {customerId} = this.props;

    if(!customerId){
      return <div>请先登录！</div>
    }

    switch (currentTabKey) {
      case 'MyHome':
        return <MyHome {...this.props} />;
      case 'BankCard':
        return <BankCard {...this.props} />;
      case 'AccountSafe':
        return <AccountSafe {...this.props} />;
      case 'Promote':
        return <Promote {...this.props} />;
    }
  }

  render() {
    const { currentTabKey, currentComp } = this.state;
    const {cwpCustomers: {customerName}} = this.props;


    return (
      <div id="PersonalCenter">
        <Header />
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
          <div className="content">
            {this.renderBody(currentTabKey)}
          </div>
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
