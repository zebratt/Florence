import { createActions } from 'redux-actions'
import { UPDATE_LOGIN, QUERY_CUSTOMER_BY_TOKEN, GET_NEWS, GET_NOTICE } from './contants'
import { URL_QUERY_CUSTOMER_BY_TOKEN, URL_QUERY_NOTICE } from '../../utils/urls'

export default createActions({
    [UPDATE_LOGIN]: (status, token, cwpCustomers) => {
        return {
            status,
            token,
            cwpCustomers
        }
    },
    [QUERY_CUSTOMER_BY_TOKEN]: async token => {
        const res = await axios.post(URL_QUERY_CUSTOMER_BY_TOKEN, {
            token
        })

        return Object.assign(res.data, { token })
    },
    [GET_NEWS]: async () => {
        // const res = await axios.get('/news/api/roll/get?pageid=155&lid=1686&num=10&page=1')
        const res = [
            {
                title: '商品期货大面积收红 焦炭涨逾3%',
                url: 'http://finance.sina.com.cn/money/future/fmnews/2018-06-29/doc-iheqpwqy9182949.shtml',
                crateTime: '2018-6-29'
            },
            {
                title: '国际油价再次暴涨',
                url: 'http://finance.sina.com.cn/roll/2018-06-28/doc-iheqpwqx7908947.shtml',
                createTime: '2018-6-29'
            },{
                title: '油价刷新三年半高位',
                url: 'http://finance.sina.com.cn/money/forex/hbfx/2018-06-29/doc-iheqpwqy5495748.shtml',
                createTime: '2018-6-29'
            },{
                title: '螺卷矿下半年投资策略：买多卷螺差和螺矿比',
                url: 'http://finance.sina.com.cn/money/future/fmnews/2018-06-29/doc-iheqpwqz0741649.shtml',
                createTime: '2018-6-29'
            },{
                title: '《前瞻》：人民币贬值尽头在哪 今年会破10年新低？',
                url: 'http://finance.sina.com.cn/money/forex/forexroll/2018-06-29/doc-iheqpwqy7250568.shtml',
                createTime: '2018-6-29'
            },{
                title: '王蓓：7月份焦炭价格仍存在回调压力？| 市场解读',
                url: 'http://finance.sina.com.cn/money/future/fmnews/2018-06-29/doc-iheqpwqz0751127.shtml',
                createTime: '2018-6-29'
            }
        ]

        return res
    },
    [GET_NOTICE]: async () => {
        const res = await axios.post(URL_QUERY_NOTICE)

        return res.data
    }
})
