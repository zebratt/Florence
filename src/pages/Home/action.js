import { createActions } from 'redux-actions';
import { UPDATE_LOGIN, QUERY_CUSTOMER_BY_TOKEN } from './contants';
import { URL_QUERY_CUSTOMER_BY_TOKEN} from '../../utils/urls';

export default createActions({
  [UPDATE_LOGIN]: (status, token, cwpCustomers) => {
    return {
      status,
      token,
      cwpCustomers
    };
  },
  [QUERY_CUSTOMER_BY_TOKEN]: async (token)=>{
    const res = await axios.post(URL_QUERY_CUSTOMER_BY_TOKEN, {
      token
    });

    return Object.assign(res.data, {token});
  }
});
