import { createActions } from 'redux-actions';
import { QUERY_BANK_CARD } from './contants';
import { URL_QUERY_BANK_CARD } from '../../../../utils/urls';
import {notification} from 'antd';

export default createActions({
  [QUERY_BANK_CARD]: async (customerId, client_token) => {
    const res = await axios.post(URL_QUERY_BANK_CARD, {
      customerId: customerId,
      client_token: client_token
    });

    if(res.code != 1){
      notification.error({
        message: res.msg
      })

      return [];
    }else{
      return res.data;
    }
  }
});
