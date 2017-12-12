import { config } from 'utils/config';
import { axios } from 'utils/apiService';
import store from '../store';
import './dateTool';

export function init() {
  window.CONFIG = config;
  window.axios = axios;
  window.store = store;
}
