import './style.scss'
import * as React from 'react'
import Header from 'components/Header'
import NavBar from 'components/NavBar'
import Footer from 'components/Footer/Footer'
import imgQR from './images/qr.png'

export default () => {
    return (
        <div id="Download">
            <Header />
            <NavBar />
            <div className="main">
                <div className="title">软件下载</div>
                <br/>
                <div className="line">
                    <div className="name">澎博鑫管家-博易大师</div>
                    <button
                        className="btn"
                        onClick={() => {
                            location.href = '/upload/博易大师.exe'
                        }}
                    >
                        点击下载
                    </button>
                </div>
                <div className="line">
                    <div className="name">澎博鑫管家-闪电王</div>
                    <button
                        className="btn"
                        onClick={() => {
                            location.href = '/upload/闪电王.exe'
                        }}
                    >
                        点击下载
                    </button>
                </div>
                <div className="line">
                    <div className="name">快期</div>
                    <button
                        className="btn"
                        onClick={() => {
                            location.href = '/upload/快期.exe'
                        }}
                    >
                        点击下载
                    </button>
                </div>
                <div className="line">
                    <div className="name" style={{verticalAlign: 'top'}}>手机APP下载</div>
                    <img src={imgQR} />
                </div>
            </div>
            <Footer />
        </div>
    )
}
