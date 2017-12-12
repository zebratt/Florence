import { handleActions } from 'redux-actions';
import { UPDATE_LOGIN, QUERY_CUSTOMER_BY_TOKEN } from './contants';
import _cloneDeep from 'lodash/cloneDeep';

const initState = {
  loginStatus: false,
  token: '',
  customerId: '',
  cwpCustomers: {}
};

const reducer = handleActions(
  {
    [UPDATE_LOGIN]: (state, action) => {
      const { status, token, cwpCustomers } = action.payload;

      return { loginStatus: status, token: token, customerId: cwpCustomers.customerId, cwpCustomers: cwpCustomers };
    },
    [QUERY_CUSTOMER_BY_TOKEN]: (state, action)=>{
      const {token, customerId} = action.payload;
      const nState = _cloneDeep(state);

      nState.loginStatus = true;
      nState.token = token;
      nState.customerId = customerId;
      nState.cwpCustomers = action.payload;

      return nState;
    }
  },
  initState
);

export default reducer;
