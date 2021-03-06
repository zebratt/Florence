import { handleActions } from 'redux-actions'
import { UPDATE_LOGIN, QUERY_CUSTOMER_BY_TOKEN, GET_NEWS, GET_NOTICE } from './contants'
import _cloneDeep from 'lodash/cloneDeep'

const initState = {
    loginStatus: false,
    token: '',
    customerId: '',
    cwpCustomers: {},
    news: [],
    notices: []
}

const reducer = handleActions(
    {
        [UPDATE_LOGIN]: (state, action) => {
            const { status, token, cwpCustomers } = action.payload

            return { loginStatus: status, token: token, customerId: cwpCustomers.id, cwpCustomers: cwpCustomers }
        },
        [QUERY_CUSTOMER_BY_TOKEN]: (state, action) => {
            const { token, id } = action.payload
            const nState = _cloneDeep(state)

            nState.loginStatus = true
            nState.token = token
            nState.customerId = id
            nState.cwpCustomers = action.payload

            return nState
        },
        [GET_NEWS]: (state, action) => {
            const nState = _cloneDeep(state)

            nState.news = action.payload

            return nState
        },
        [GET_NOTICE]: (state, action) => {
            const nState = _cloneDeep(state)

            nState.notices = action.payload.map((item) => {
                return Object.assign(item, {url: `/notice/${item.id}`})
            })

            return nState
        }
    },
    initState
)

export default reducer
