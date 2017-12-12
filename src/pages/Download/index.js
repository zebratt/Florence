/**
 * Created by xuejian.xu on 2017/12/12.
 */

import './style.scss';
import React from 'react';
import NavBar from '../../components/NavBar/index';
import Header from '../../components/Header/index';

export default ()=>{
  return (
    <div id="Download">
      <Header />
      <NavBar />
      <div className="main">
        软件下载
      </div>
    </div>
  );
}
