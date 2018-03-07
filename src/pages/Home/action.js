import { createActions } from 'redux-actions'
import { UPDATE_LOGIN, QUERY_CUSTOMER_BY_TOKEN, GET_NEWS } from './contants'
import { URL_QUERY_CUSTOMER_BY_TOKEN } from '../../utils/urls'

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
        const res = await axios.get('/news/api/roll/get?pageid=155&lid=1686&num=10&page=1')

        return res.result.data
    }
})
