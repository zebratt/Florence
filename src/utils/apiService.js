/**
 * Created by xuejian.xu on 2017/8/10.
 */

import axios from 'axios';
import { notification } from 'antd';
import qs from 'qs';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use(config => {
  Object.assign(config, {
    data: qs.stringify(config.data)
  });

  return config;
});

axios.interceptors.response.use(
  res => {
    const { data } = res;

    return data;
  },
  error => {
    notification.error({
      message: '网络异常，请检查网络连接'
    });
  }
);

export { axios };
