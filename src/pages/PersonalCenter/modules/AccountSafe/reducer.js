import { handleActions } from 'redux-actions';
import { GET_REAL_NAME_STATUS } from './contants';

const initState = {
    hasRealName: false,
    idCard: '',
    name: '',
    images: ''
};

const reducer = handleActions(
    {
        [GET_REAL_NAME_STATUS]: (state, action) => {
            const { payload: {hasRealName, idCard, name, images} } = action;

            return { hasRealName, idCard, name, images };
        }
    },
    initState
);

export default reducer;
