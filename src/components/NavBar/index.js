/**
 * Created by xuejian.xu on 2017/10/20.
 */

import './style.scss';
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class NavBar extends Component{
  isActive(match, location) {
    if (match) {
      return match.path === location.pathname;
    }
  }

  render(){
    return (
      <div id="NavBar">
        <div className="content">
          <ul className="tabs">
            <li>
              <NavLink isActive={this.isActive} to="/">
                <span>首页</span>
              </NavLink>
            </li>
            <li>
              <NavLink isActive={this.isActive} to="/download">
                <span>软件下载</span>
              </NavLink>
            </li>
            <li>
              <NavLink isActive={this.isActive} to="/personal/home">
                <span>个人中心</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default NavBar;
