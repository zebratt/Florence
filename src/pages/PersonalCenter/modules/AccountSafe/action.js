import { createActions } from 'redux-actions';
import { GET_REAL_NAME_STATUS } from './contants';
import { URL_REAL_NAME } from '../../../../utils/urls';
import { notification } from 'antd';

export default createActions({
    [GET_REAL_NAME_STATUS]: async customerId => {
        const res = await axios.post(URL_REAL_NAME, {
            customerId: customerId
        });

        if (res.code != 1) {
            return {
                hasRealName: false
            };
        } else {
            return {
                hasRealName: true,
                idCard: res.data.customerCardId,
                name: res.data.customerRealName
            };
        }
    }
});
