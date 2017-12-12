/**
 * @fileOverView: 账户安全
 * @author: xuejian.xu
 * @date: 2017/11/18.
 */

import './style.scss';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import _get from 'lodash/get';

class AccountSafe extends Component{
  render(){
    const {cwpCustomers} = this.props;
    const phone = _get(cwpCustomers, 'customerName');

    return (
      <div id="AccountSafe">
        <div className="title">账户安全</div>
        <table className="table">
          <tbody>
          <tr>
            <td className="label" width={'20%'}>绑定手机:</td>
            <td width={'60%'}>{phone}</td>
            <td width={'20%'}>
              <button className="btn-modify">修改</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}


const mapStateToProps = state => {
  const { Home } = state;

  return Object.assign({}, Home);
};

export default connect(mapStateToProps)(AccountSafe);
