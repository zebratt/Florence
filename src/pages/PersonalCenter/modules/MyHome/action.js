import { createActions } from 'redux-actions'
import { QUERY_FUND_DETAILS, QUERY_BALANCE, QUERY_FUND_BALANCE } from './contants'
import { URL_QUERY_FUNDS_DETAILS, URL_QUERY_BALANCE,  URL_QUERY_FUND_BALANCE } from '../../../../utils/urls'
import { notification } from 'antd'

export default createActions({
    [QUERY_FUND_DETAILS]: async (customerId, client_token, pageIndex) => {
        const res = await axios.post(URL_QUERY_FUNDS_DETAILS, {
            customerId: customerId,
            client_token: client_token,
            pageNumber: pageIndex,
            pageSize: 10
        })

        if (res.code != 1) {
            notification.error({
                message: res.msg
            })

            return []
        } else {
            return res.data
        }
    },
    [QUERY_BALANCE]: async (customerId, token) => {
        const res = await axios.post(URL_QUERY_BALANCE, {
            customerId,
            client_token: token
        })

        if (res.code != 1) {
            notification.error({
                message: res.msg
            })

            return []
        } else {
            return res.data
        }
    },
    [QUERY_FUND_BALANCE]: async (customerId, token) => {
        const res = await axios.post(URL_QUERY_FUND_BALANCE, {
            customerId,
            client_token: token
        })

        if (res.code != 1) {
            notification.error({
                message: res.msg
            })

            return []
        } else {
            return res.data
        }
    }
})
