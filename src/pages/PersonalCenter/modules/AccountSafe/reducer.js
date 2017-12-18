import { handleActions } from 'redux-actions';
import { GET_REAL_NAME_STATUS } from './contants';

const initState = {
    hasRealName: false,
    idCard: '',
    name: ''
};

const reducer = handleActions(
    {
        [GET_REAL_NAME_STATUS]: (state, action) => {
            const { payload: {hasRealName, idCard, name} } = action;

            return { hasRealName, idCard, name };
        }
    },
    initState
);

export default reducer;
