import './Compare.scss'
import React from 'react'

export default () => (
    <div className="Compare">
        <div className="title">国内原油期货合约草案与欧美合约对比</div>
        <div className="content">
            <div className="box">
                <table className="table">
                    <tbody>
                        <tr>
                            <td width="40%">交易品种</td>
                            <td width="60%">中质含硫原油</td>
                        </tr>
                        <tr>
                            <td>交易单位</td>
                            <td>1000桶/手</td>
                        </tr>
                        <tr>
                            <td>报价单位</td>
                            <td>元（人民币）/桶，（交易报价为不含税价格）</td>
                        </tr>
                        <tr>
                            <td>最小变动单位</td>
                            <td>0.1元（人民币）/桶</td>
                        </tr>
                        <tr>
                            <td>涨跌停板幅度</td>
                            <td>不超过上一交易日结算价±4%</td>
                        </tr>
                        <tr>
                            <td>合约交割月份</td>
                            <td>最近1-12个月为连续月份以及随后八个季月</td>
                        </tr>
                        <tr>
                            <td>交易时间</td>
                            <td>上午9:00 - 11:30，下午1:30 - 3:00以及上海国际能源交易中心规定的其他交易时间。</td>
                        </tr>
                        <tr>
                            <td>最后交易日</td>
                            <td>
                                交割月份前第一月的最后一个交易日；上海国际能源交易中心有权根据国家法定节假日调整最后交易日
                            </td>
                        </tr>
                        <tr>
                            <td>交割日期</td>
                            <td>最后交易日后连续五个交易日</td>
                        </tr>
                        <tr>
                            <td>交割品质</td>
                            <td>
                                中质含硫原油，基准品质为API度32.0，硫含量1.5%，具体可交割油种及升贴水由上海国际能源交易中心另行规定。
                            </td>
                        </tr>
                        <tr>
                            <td>交割地点</td>
                            <td>上海国际能源交易中心指定交割仓库</td>
                        </tr>
                        <tr>
                            <td>最低交易保证金</td>
                            <td>合约价值的5%</td>
                        </tr>
                        <tr>
                            <td>交割方式</td>
                            <td>实物交割</td>
                        </tr>
                        <tr>
                            <td>交易代码</td>
                            <td>SC</td>
                        </tr>
                        <tr>
                            <td>上市机构</td>
                            <td>上海国际能源交易中心</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="box">
                <table className="table">
                    <tbody>
                        <tr>
                            <td width="20%">合约名称</td>
                            <td width="40%">美原油</td>
                            <td width="40%">布伦特原油</td>
                        </tr>
                        <tr>
                            <td>交易所</td>
                            <td>NYMEX</td>
                            <td>ICE</td>
                        </tr>
                        <tr>
                            <td>合约单位</td>
                            <td>1000桶</td>
                            <td>1000桶</td>
                        </tr>
                        <tr>
                            <td>1.0点价值</td>
                            <td>1000</td>
                            <td>1000</td>
                        </tr>
                        <tr>
                            <td>最小跳价单位</td>
                            <td>0.01</td>
                            <td>0.01</td>
                        </tr>
                        <tr>
                            <td>最小跳价值</td>
                            <td>10</td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td>涨跌幅限制</td>
                            <td>
                                上一交易日结算价±$10,如果有任何一个合约在涨跌停板上的交易或出价达到5分钟，则停盘5分钟。之后，涨跌停板扩大10.00美元/桶。如果再次出现同样情况，停盘5分钟之后，涨跌停板再扩大10.00美元/桶
                            </td>
                            <td>无</td>
                        </tr>
                        <tr>
                            <td>交易时间</td>
                            <td>
                                ELEC:18:00-17:15 本地时间 06:00-05:15 PIT: 09:00-14:30 本地时间 21:00-02:30（夏令时）
                            </td>
                            <td>01:00-23:00 本地时间：08:00-06:00</td>
                        </tr>
                        <tr>
                            <td>交易合约</td>
                            <td>
                                最多72个连续月份，此后交易所再推出6份合约，其中包括6月份和12月份的合约，交易期为3年。每年12月份合约到期后，将增加12个合约月份。原油期货在到期日的场内交易时段结束时到期
                            </td>
                            <td>
                                最多72个连续月份，此后交易所再推出6份合约，其中包括6月份和12月份的合约，交易期为3年。每年12月份合约到期后，将增加12个合约月份。原油期货在到期日的场内交易时段结束时到期
                            </td>
                        </tr>
                        <tr>
                            <td>合约保证金</td>
                            <td>根据SPAN模型进行测算</td>
                            <td>根据SPAN模型进行测算</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
)
