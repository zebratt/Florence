import { handleActions } from 'redux-actions';
import { QUERY_BANK_CARD } from './contants';
import _cloneDeep from 'lodash/cloneDeep';

const initState = {
  bankcards: [],
};

const reducer = handleActions(
  {
    [QUERY_BANK_CARD]: (state, action) => {
      const { payload } = action;
      const nState = _cloneDeep(state);

      nState.bankcards = payload;

      return nState;
    }
  },
  initState
);

export default reducer;
