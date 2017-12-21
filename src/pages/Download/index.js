import './style.scss';
import * as React from 'react';
import Header from 'components/Header';
import NavBar from 'components/NavBar';

export default () => {
    return (
        <div id="Download">
            <Header />
            <NavBar />
            <div className="main">
                <div className="title">软件下载</div>
                <div className="name">博易鑫管家交易软件</div>
                <button className="btn" onClick={() => {
                    location.href = 'http://www.byxgj.com/uploads/soft/VZ/先融期货-鑫管家博易大师.exe';
                }}>点击下载</button>
            </div>
        </div>
    )
}