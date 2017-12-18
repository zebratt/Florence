import './style.scss';
import * as React from 'react';
import { Route } from 'react-router-dom';
import imgLogo from './images/bank-logo.jpg';
import imgQr from './images/alipay.png';
import classNames from 'classnames';
import tabs from './tabs';

export default class Charge extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            currTab: props.match.params.tab || 'bankcard'
        }
    }
    tabClick = (key) => {
        this.setState({
            currTab: key
        });

        this.props.history.push(key);
    }
    render() {
        return (
            <div id="Charge">
                <div className="charge-title">账户充值</div>
                <ul className="nav">
                    {
                        tabs.map((tab) => {
                            const classes = classNames({
                                active: tab.key === this.state.currTab
                            });

                            return (
                                <li key={tab.key} className={classes} onClick={() => {
                                    this.tabClick(tab.key);
                                }}>{tab.name}</li>
                            )
                        })
                    }
                </ul>
                <Route exact path="/personal/home/charge/bankcard" component={Bankcard} />
                <Route exact path="/personal/home/charge/alipay" component={Alipay} />
            </div>
        );
    }
}

const Alipay = () => {
    return <div className="alipay">
        <div className="qr-code">
            <img src={imgQr} alt=""/>
        </div>
        <div className="line red">
        请扫码充值，并务必在转账备注中填写注册手机号，这样方便我们多重信息确认您的汇款。
        </div>
        <div className="line">
转账成功后，请拨打客服热线 4008261289 以便我们及时帮您处理 
        </div>
        <div className="line">
账号：1793685107@qq.com‍ 
        </div>
        <div className="line">
户名：温州赢利宝资产管理有限公司
        </div>
    </div>;
};

const Bankcard = () => {
    return (
        <div className="bankcard">
            <div className="bold">您可以通过网上银行、银行柜台或ATM机向转账（手续费单笔最高50元）</div>
            <div className="line">请务必在转账备注中填写注册手机号，这样方便我们多重信息确认您的汇款。</div>
            <div className="line">转账成功后，请拨打客服热线 4008261289 以便我们及时帮您处理</div>
            <table className="charge-table">
                <tbody>
                    <tr>
                        <td width="25%">
                            <img className="logo" src={imgLogo} alt="" />
                        </td>
                        <td>
                            <p>帐号：6217684600924341</p>
                            <p>户名：黄旭东</p>
                            <p>开户行：温州分行营业部</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="line">用户网银转账之后，请务必保留网银转账成功时的截图，并在资金或者转账用途中备注清自己要转入的用户名，将回单发到QQ客服，以便尽快到账！</div>
        </div>
    );
};
