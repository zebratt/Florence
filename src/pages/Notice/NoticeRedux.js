import { createActions, handleActions } from 'redux-actions'
import { URL_QUERY_NOTICE } from 'utils/urls'

const GET_NOTICE = 'GET_NOTICE'

export const actions = createActions({
    [GET_NOTICE]: async () => {
        const res = await axios.post(URL_QUERY_NOTICE)

        return res.data
    }
})

export const reducer = handleActions(
    {
        [GET_NOTICE]: (state, action) => {
            state.notices = action.payload

            return Object.assign({}, state)
        }
    },
    {
        notices: []
    }
)